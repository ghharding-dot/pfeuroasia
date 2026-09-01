function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export async function redisCommand(command: Array<string | number>) {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Redis command failed: ${response.status}`);
  return (await response.json()) as { result?: unknown };
}

function isoWeek(date: Date) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function partnerClickKey(date = new Date()) {
  return `pfe:partner-clicks:${isoWeek(date)}`;
}

export function previousPartnerClickKey(date = new Date()) {
  const previousWeek = new Date(date);
  previousWeek.setUTCDate(previousWeek.getUTCDate() - 7);
  return partnerClickKey(previousWeek);
}

export async function recordPartnerClick(details: {
  partner: string;
  code: string;
  country: string;
}) {
  const key = partnerClickKey();
  const country = details.country || "Not available";

  await Promise.all([
    redisCommand(["HINCRBY", key, "total", 1]),
    redisCommand(["HINCRBY", key, `partner:${details.code}:${details.partner}`, 1]),
    redisCommand(["HINCRBY", key, `country:${country}`, 1]),
    redisCommand(["EXPIRE", key, 60 * 60 * 24 * 120]),
  ]);
}
