# Property Facilitators EuroAsia

Bilingual luxury property website connecting Spain and Asia.

## Deployment

This repository is configured for deployment on Vercel using standard Next.js settings.

## Concierge voice activation

Voice is prepared but disabled by default. Set `OPENAI_API_KEY` as a sensitive
server environment variable in Vercel, never in source or a `NEXT_PUBLIC_` variable.
Set `CONCIERGE_VOICE_ENABLED=true` first in Preview and redeploy to test microphone,
playback, transcript delegation, Labuan client prices and verified page buttons.
After those live checks, enable the same flag in Production and redeploy.
The voice service uses GPT-Live with the feminine Willow voice (Irish English),
while factual requests go to the existing `/api/concierge` backend.

The controls close sessions after five minutes, one minute without transcript
activity, leaving the tab, closing the widget, or opening the enquiry form.
The instance-local start limit is best-effort abuse protection, not a durable
monthly spending cap. Configure billing controls in the provider account before
public activation. Set `CONCIERGE_VOICE_ENABLED=false` and redeploy to disable voice.

Verified locally: TypeScript, ESLint and simulated session-route requests.
Live audio and provider-account access still require verification after the key is added.

## Concierge knowledge

`scripts/prepare-concierge-knowledge.mjs` captures the currently published,
allowlisted public pages before builds into a server-side JSON reference. Guides,
Malaysia adviser knowledge and approved Labuan client prices use their local
source data. Questions and search tools read these references without fetching
HTML pages. Each captured page retains its capture time; failed captures retain
the previous reference when available, otherwise the page metadata is used.

After a content release, run the preparation script and deploy its updated JSON
to capture the newly published wording; prebuild also refreshes published pages
on subsequent deployments. This is a snapshot, not a live verification of legal
rules or availability. Property and rental records are loaded for relevant
questions and cached for up to 60 seconds per running server instance, with the
same publication and approval filters. Protected pages and property records are
excluded from the bundled snapshot.
