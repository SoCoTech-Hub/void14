import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const infectedFiles = pgTable("infected_files", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  fileName: text("file_name"),
  quarantinedFile: text("quarantined_file"),
  reason: text("reason"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for infectedFiles - used to validate API requests
const baseSchema = createSelectSchema(infectedFiles).omit(timestamps);

export const insertInfectedFileSchema =
  createInsertSchema(infectedFiles).omit(timestamps);
export const insertInfectedFileParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateInfectedFileSchema = baseSchema;
export const updateInfectedFileParams = baseSchema.extend({}).omit({
  userId: true,
});
export const infectedFileIdSchema = baseSchema.pick({ id: true });

// Types for infectedFiles - used to type API request params and within Components
export type InfectedFile = typeof infectedFiles.$inferSelect;
export type NewInfectedFile = z.infer<typeof insertInfectedFileSchema>;
export type NewInfectedFileParams = z.infer<typeof insertInfectedFileParams>;
export type UpdateInfectedFileParams = z.infer<typeof updateInfectedFileParams>;
export type InfectedFileId = z.infer<typeof infectedFileIdSchema>["id"];

