import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const logDisplays = pgTable("log_displays", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  action: varchar("action", { length: 256 }),
  component: varchar("component", { length: 256 }),
  field: varchar("field", { length: 256 }),
  module: varchar("module", { length: 256 }),
  mTable: varchar("m_table", { length: 256 }),
});

// Schema for logDisplays - used to validate API requests
const baseSchema = createSelectSchema(logDisplays);

export const insertLogDisplaySchema = createInsertSchema(logDisplays);
export const insertLogDisplayParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateLogDisplaySchema = baseSchema;
export const updateLogDisplayParams = baseSchema.extend({});
export const logDisplayIdSchema = baseSchema.pick({ id: true });

// Types for logDisplays - used to type API request params and within Components
export type LogDisplay = typeof logDisplays.$inferSelect;
export type NewLogDisplay = z.infer<typeof insertLogDisplaySchema>;
export type NewLogDisplayParams = z.infer<typeof insertLogDisplayParams>;
export type UpdateLogDisplayParams = z.infer<typeof updateLogDisplayParams>;
export type LogDisplayId = z.infer<typeof logDisplayIdSchema>["id"];
