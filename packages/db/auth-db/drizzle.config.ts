import type { Config } from "drizzle-kit";

if (!process.env.AUTH_DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

const nonPoolingUrl = process.env.AUTH_DATABASE_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
} satisfies Config;
