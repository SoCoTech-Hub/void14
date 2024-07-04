import { boolean, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGlossaryFormats } from "../api/glossaryFormats/queries";

export const glossaryFormats = pgTable(
  "glossary_formats",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    defaultHook: varchar("default_hook", { length: 256 }),
    defaultMode: varchar("default_mode", { length: 256 }),
    name: varchar("name", { length: 256 }),
    popUpFormatName: varchar("pop_up_format_name", { length: 256 }),
    showGroup: boolean("show_group"),
    visible: boolean("visible"),
    showTabs: varchar("show_tabs", { length: 256 }),
    sortKey: varchar("sort_key", { length: 256 }),
    sortOrder: varchar("sort_order", { length: 256 }),
  },
  (glossaryFormats) => {
    return {
      sortOrderIndex: uniqueIndex("glossary_formats_sort_order_idx").on(
        glossaryFormats.sortOrder,
      ),
    };
  },
);

// Schema for glossaryFormats - used to validate API requests
const baseSchema = createSelectSchema(glossaryFormats);

export const insertGlossaryFormatSchema = createInsertSchema(glossaryFormats);
export const insertGlossaryFormatParams = baseSchema
  .extend({
    showGroup: z.coerce.boolean(),
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateGlossaryFormatSchema = baseSchema;
export const updateGlossaryFormatParams = baseSchema.extend({
  showGroup: z.coerce.boolean(),
  visible: z.coerce.boolean(),
});
export const glossaryFormatIdSchema = baseSchema.pick({ id: true });

// Types for glossaryFormats - used to type API request params and within Components
export type GlossaryFormat = typeof glossaryFormats.$inferSelect;
export type NewGlossaryFormat = z.infer<typeof insertGlossaryFormatSchema>;
export type NewGlossaryFormatParams = z.infer<
  typeof insertGlossaryFormatParams
>;
export type UpdateGlossaryFormatParams = z.infer<
  typeof updateGlossaryFormatParams
>;
export type GlossaryFormatId = z.infer<typeof glossaryFormatIdSchema>["id"];

// this type infers the return from getGlossaryFormats() - meaning it will include any joins
export type CompleteGlossaryFormat = Awaited<
  ReturnType<typeof getGlossaryFormats>
>["glossaryFormats"][number];
