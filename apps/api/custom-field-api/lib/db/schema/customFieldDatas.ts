import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCustomFieldDatas } from "../api/customFieldDatas/queries";

export const customFieldDatas = pgTable("custom_field_datas", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  charValue: varchar("char_value", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  decValue: real("dec_value"),
  fieldId: varchar("field_id", { length: 256 }),
  instanceId: varchar("instance_id", { length: 256 }),
  intValue: integer("int_value"),
  shortCharValue: varchar("short_char_value", { length: 256 }),
  value: text("value"),
  valueFormat: integer("value_format"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for customFieldDatas - used to validate API requests
const baseSchema = createSelectSchema(customFieldDatas).omit(timestamps);

export const insertCustomFieldDataSchema =
  createInsertSchema(customFieldDatas).omit(timestamps);
export const insertCustomFieldDataParams = baseSchema
  .extend({
    decValue: z.coerce.number(),
    intValue: z.coerce.number(),
    valueFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateCustomFieldDataSchema = baseSchema;
export const updateCustomFieldDataParams = baseSchema.extend({
  decValue: z.coerce.number(),
  intValue: z.coerce.number(),
  valueFormat: z.coerce.number(),
});
export const customFieldDataIdSchema = baseSchema.pick({ id: true });

// Types for customFieldDatas - used to type API request params and within Components
export type CustomFieldData = typeof customFieldDatas.$inferSelect;
export type NewCustomFieldData = z.infer<typeof insertCustomFieldDataSchema>;
export type NewCustomFieldDataParams = z.infer<
  typeof insertCustomFieldDataParams
>;
export type UpdateCustomFieldDataParams = z.infer<
  typeof updateCustomFieldDataParams
>;
export type CustomFieldDataId = z.infer<typeof customFieldDataIdSchema>["id"];

// this type infers the return from getCustomFieldDatas() - meaning it will include any joins
export type CompleteCustomFieldData = Awaited<
  ReturnType<typeof getCustomFieldDatas>
>["customFieldDatas"][number];
