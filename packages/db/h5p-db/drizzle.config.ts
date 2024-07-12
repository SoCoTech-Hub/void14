import type { Config } from "drizzle-kit";
import { config as loadEnv } from "dotenv";

loadEnv(); // Load environment variables from .env file

if (!process.env.H5P_DB_URL) {
  throw new Error("Missing environment variable: H5P_DB_URL");
}

const nonPoolingUrl = process.env.H5P_DB_URL.replace(":6543", ":5432");

const drizzleConfig: Config = {
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
};

export default drizzleConfig;
