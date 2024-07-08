import { type getTagAreas } from "@/lib/api/tagAreas/queries";
import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { tagColls } from "./tagColls";

export const tagAreas = pgTable("tag_areas", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  callback: varchar("callback", { length: 256 }),
  callbackFile: varchar("callback_file", { length: 256 }),
  component: varchar("component", { length: 256 }),
  enabled: boolean("enabled"),
  itemType: varchar("item_type", { length: 256 }),
  multipleContexts: boolean("multiple_contexts"),
  showStandard: boolean("show_standard"),
  tagCollId: varchar("tag_coll_id", { length: 256 })
    .references(() => tagColls.id)
    .notNull(),
});

// Schema for tagAreas - used to validate API requests
const baseSchema = createSelectSchema(tagAreas);

export const insertTagAreaSchema = createInsertSchema(tagAreas);
export const insertTagAreaParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    multipleContexts: z.coerce.boolean(),
    showStandard: z.coerce.boolean(),
    tagCollId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateTagAreaSchema = baseSchema;
export const updateTagAreaParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
  multipleContexts: z.coerce.boolean(),
  showStandard: z.coerce.boolean(),
  tagCollId: z.coerce.string().min(1),
});
export const tagAreaIdSchema = baseSchema.pick({ id: true });

// Types for tagAreas - used to type API request params and within Components
export type TagArea = typeof tagAreas.$inferSelect;
export type NewTagArea = z.infer<typeof insertTagAreaSchema>;
export type NewTagAreaParams = z.infer<typeof insertTagAreaParams>;
export type UpdateTagAreaParams = z.infer<typeof updateTagAreaParams>;
export type TagAreaId = z.infer<typeof tagAreaIdSchema>["id"];

// this type infers the return from getTagAreas() - meaning it will include any joins
export type CompleteTagArea = Awaited<
  ReturnType<typeof getTagAreas>
>["tagAreas"][number];
