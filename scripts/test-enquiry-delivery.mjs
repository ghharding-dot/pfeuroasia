import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';

const helperSource = stripTypeScriptTypes(readFileSync(new URL('../app/lib/submitEnquiry.ts', import.meta.url), 'utf8')).replace('export async function submitEnquiry', 'async function submitEnquiry');
for (const [status, body, accepted] of [
  [200, { ok: true, reference: 'PFE-2026-123456', delivery: 'sent' }, true],
  [200, { ok: true, reference: 'PFE-RECEIVED', delivery: 'sent' }, false],
  [202, { ok: true, reference: 'PFE-2026-123456', delivery: 'browser-fallback' }, false],
  [502, { ok: false, reference: 'PFE-2026-123456', delivery: 'failed' }, false],
  [200, { ok: true, reference: 'PFE-2026-123456' }, false],
]) {
  const sandbox = { fetch: async () => new Response(JSON.stringify(body), { status }) };
  vm.createContext(sandbox);
  vm.runInContext(helperSource + '\nthis.submitEnquiry = submitEnquiry;', sandbox);
  if (accepted) assert.equal((await sandbox.submitEnquiry({})).reference, body.reference);
  else await assert.rejects(sandbox.submitEnquiry({}));
}

const routeSource = stripTypeScriptTypes(readFileSync(new URL('../app/api/enquiries/route.ts', import.meta.url), 'utf8'))
  .replace(/^import .*;\n/gm, '')
  .replace(/export const runtime.*;\n/, '')
  .replace('export async function POST', 'async function POST');
async function invoke({ spam = '', providerFailure = false, acknowledgementFailure = false, configured = true } = {}) {
  const sends = [];
  const logs = [];
  const sandbox = {
    process: { env: configured ? { RESEND_API_KEY: 'test-only-not-a-real-key' } : {} },
    console: { info: (...args) => logs.push(args), warn: (...args) => logs.push(args), error: (...args) => logs.push(args) },
    NextResponse: { json: (body, init = {}) => ({ status: init.status || 200, body }) },
    getPartnerReferral: () => undefined,
    getPartnerContact: () => ({}),
    fetch: async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      sends.push(JSON.parse(options.body));
      const failed = providerFailure || (acknowledgementFailure && sends.length === 2);
      return new Response(JSON.stringify(failed ? { message: 'Rejected' } : { id: 'email-' + sends.length }), { status: failed ? 403 : 200 });
    },
  };
  vm.createContext(sandbox);
  vm.runInContext(routeSource + '\nthis.POST = POST;', sandbox);
  const result = await sandbox.POST({ json: async () => ({ full_name: 'Test visitor', email: 'visitor@example.com', enquiry_type: 'luxury-rental', company_website: spam }), headers: new Headers() });
  return { result, sends, logs };
}
const success = await invoke();
assert.equal(success.result.body.delivery, 'sent');
assert.equal(success.sends.length, 2);
assert.ok(success.sends[0].to.includes('enquiry@pfeuroasia.com'));
assert.ok(success.sends[0].to.includes('reservations@theluxuryvillacollection.com'));
assert.ok(success.logs.some(([kind]) => kind === 'enquiry-record'));
assert.ok(success.logs.some(([kind]) => kind === 'enquiry-email-accepted'));
const spam = await invoke({ spam: 'autofill' });
assert.equal(spam.result.status, 422);
assert.equal(spam.result.body.ok, false);
assert.equal(spam.sends.length, 0);
const rejected = await invoke({ providerFailure: true });
assert.equal(rejected.result.status, 502);
assert.equal(rejected.result.body.ok, false);
assert.ok(rejected.logs.some(([kind]) => kind === 'enquiry-record'));
const missing = await invoke({ configured: false });
assert.equal(missing.result.status, 502);
assert.equal(missing.sends.length, 0);
const ackFailure = await invoke({ acknowledgementFailure: true });
assert.equal(ackFailure.result.body.delivery, 'sent');
assert.ok(ackFailure.logs.some(([kind]) => kind === 'enquiry-client-confirmation-failed'));
console.log('Passed: success, spam rejection, provider failure, missing configuration, acknowledgement failure, rental routing and all client confirmation checks.');
