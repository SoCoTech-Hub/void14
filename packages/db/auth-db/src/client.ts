import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export const client = postgres(process.env.AUTH_AUTH_DB_URL || "");
export const db = drizzle(client, { schema });
