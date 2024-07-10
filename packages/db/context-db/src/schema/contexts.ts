import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const contexts = pgTable("contexts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextLevel: integer("context_level"),
  depth: integer("depth"),
  instanceId: varchar("instance_id", { length: 256 }),
  locked: integer("locked"),
  path: varchar("path", { length: 256 }),
});

// Schema for contexts - used to validate API requests
const baseSchema = createSelectSchema(contexts);

export const insertContextSchema = createInsertSchema(contexts);
export const insertContextParams = baseSchema
  .extend({
    contextLevel: z.coerce.number(),
    depth: z.coerce.number(),
    locked: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateContextSchema = baseSchema;
export const updateContextParams = baseSchema.extend({
  contextLevel: z.coerce.number(),
  depth: z.coerce.number(),
  locked: z.coerce.number(),
});
export const contextIdSchema = baseSchema.pick({ id: true });

// Types for contexts - used to type API request params and within Components
export type Context = typeof contexts.$inferSelect;
export type NewContext = z.infer<typeof insertContextSchema>;
export type NewContextParams = z.infer<typeof insertContextParams>;
export type UpdateContextParams = z.infer<typeof updateContextParams>;
export type ContextId = z.infer<typeof contextIdSchema>["id"];
