import { type getTagColls } from "@/lib/api/tagColls/queries";
import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const tagColls = pgTable("tag_colls", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  customUrl: varchar("custom_url", { length: 256 }),
  isDefault: boolean("is_default"),
  searchable: boolean("searchable"),
  name: varchar("name", { length: 256 }),
  sortOrder: integer("sort_order"),
});

// Schema for tagColls - used to validate API requests
const baseSchema = createSelectSchema(tagColls);

export const insertTagCollSchema = createInsertSchema(tagColls);
export const insertTagCollParams = baseSchema
  .extend({
    isDefault: z.coerce.boolean(),
    searchable: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateTagCollSchema = baseSchema;
export const updateTagCollParams = baseSchema.extend({
  isDefault: z.coerce.boolean(),
  searchable: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
});
export const tagCollIdSchema = baseSchema.pick({ id: true });

// Types for tagColls - used to type API request params and within Components
export type TagColl = typeof tagColls.$inferSelect;
export type NewTagColl = z.infer<typeof insertTagCollSchema>;
export type NewTagCollParams = z.infer<typeof insertTagCollParams>;
export type UpdateTagCollParams = z.infer<typeof updateTagCollParams>;
export type TagCollId = z.infer<typeof tagCollIdSchema>["id"];

// this type infers the return from getTagColls() - meaning it will include any joins
export type CompleteTagColl = Awaited<
  ReturnType<typeof getTagColls>
>["tagColls"][number];
