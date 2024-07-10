import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const configLogs = pgTable("config_logs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  oldValue: text("old_value"),
  plugin: varchar("plugin", { length: 256 }),
  value: text("value"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for configLogs - used to validate API requests
const baseSchema = createSelectSchema(configLogs).omit(timestamps);

export const insertConfigLogSchema =
  createInsertSchema(configLogs).omit(timestamps);
export const insertConfigLogParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateConfigLogSchema = baseSchema;
export const updateConfigLogParams = baseSchema.extend({}).omit({
  userId: true,
});
export const configLogIdSchema = baseSchema.pick({ id: true });

// Types for configLogs - used to type API request params and within Components
export type ConfigLog = typeof configLogs.$inferSelect;
export type NewConfigLog = z.infer<typeof insertConfigLogSchema>;
export type NewConfigLogParams = z.infer<typeof insertConfigLogParams>;
export type UpdateConfigLogParams = z.infer<typeof updateConfigLogParams>;
export type ConfigLogId = z.infer<typeof configLogIdSchema>["id"];
