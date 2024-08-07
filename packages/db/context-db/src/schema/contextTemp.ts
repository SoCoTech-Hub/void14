import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { contexts } from "./contexts";

export const contextTemp = pgTable("context_temp", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 })
    .references(() => contexts.id, { onDelete: "cascade" })
    .notNull(),
  depth: integer("depth"),
  locked: integer("locked"),
  path: varchar("path", { length: 256 }),
});

// Schema for contextTemp - used to validate API requests
const baseSchema = createSelectSchema(contextTemp);

export const insertContextTempSchema = createInsertSchema(contextTemp);
export const insertContextTempParams = baseSchema
  .extend({
    contextId: z.coerce.string().min(1),
    depth: z.coerce.number(),
    locked: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateContextTempSchema = baseSchema;
export const updateContextTempParams = baseSchema.extend({
  contextId: z.coerce.string().min(1),
  depth: z.coerce.number(),
  locked: z.coerce.number(),
});
export const contextTempIdSchema = baseSchema.pick({ id: true });

// Types for contextTemp - used to type API request params and within Components
export type ContextTemp = typeof contextTemp.$inferSelect;
export type NewContextTemp = z.infer<typeof insertContextTempSchema>;
export type NewContextTempParams = z.infer<typeof insertContextTempParams>;
export type UpdateContextTempParams = z.infer<typeof updateContextTempParams>;
export type ContextTempId = z.infer<typeof contextTempIdSchema>["id"];
