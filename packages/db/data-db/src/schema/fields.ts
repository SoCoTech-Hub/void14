import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { datas } from "./datas";

export const fields = pgTable("fields", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  dataId: varchar("data_id", { length: 256 })
    .references(() => datas.id, { onDelete: "cascade" })
    .notNull(),
  description: text("description"),
  name: varchar("name", { length: 256 }),
  param1: text("param1"),
  param2: text("param2"),
  param3: text("param3"),
  param4: text("param4"),
  param5: text("param5"),
  param6: text("param6"),
  param7: text("param7"),
  param8: text("param8"),
  param9: text("param9"),
  param10: text("param10"),
  required: boolean("required"),
  type: varchar("type", { length: 256 }),
});

// Schema for fields - used to validate API requests
const baseSchema = createSelectSchema(fields);

export const insertFieldSchema = createInsertSchema(fields);
export const insertFieldParams = baseSchema
  .extend({
    dataId: z.coerce.string().min(1),
    required: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateFieldSchema = baseSchema;
export const updateFieldParams = baseSchema.extend({
  dataId: z.coerce.string().min(1),
  required: z.coerce.boolean(),
});
export const fieldIdSchema = baseSchema.pick({ id: true });

// Types for fields - used to type API request params and within Components
export type Field = typeof fields.$inferSelect;
export type NewField = z.infer<typeof insertFieldSchema>;
export type NewFieldParams = z.infer<typeof insertFieldParams>;
export type UpdateFieldParams = z.infer<typeof updateFieldParams>;
export type FieldId = z.infer<typeof fieldIdSchema>["id"];
