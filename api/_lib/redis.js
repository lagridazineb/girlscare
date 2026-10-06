import Redis from "ioredis";

// One shared connection per warm serverless instance.
let client = null;
export function getRedis() {
  if (!client) {
    const url = process.env.REDIS_URL || process.env.KV_URL || process.env.REDIS_CONNECTION_STRING;
    if (!url) {
      const err = new Error("Redis connection string is missing");
      err.code = "missing_database_config";
      throw err;
    }
    client = new Redis(url, { maxRetriesPerRequest: 2 });
    client.on("error", (e) => console.error("Redis client error:", e));
  }
  return client;
}
