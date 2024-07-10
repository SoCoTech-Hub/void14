import type { Config } from "drizzle-kit";

if (!process.env.I18N_DB_URL) {
  throw new Error("Missing I18N_DB_URL");
}

const nonPoolingUrl = process.env.I18N_DB_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
} satisfies Config;
