import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGlossaryCategories } from "../api/glossaryCategories/queries";
import { glossaries } from "./glossaries";

export const glossaryCategories = pgTable("glossary_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  glossaryId: varchar("glossary_id", { length: 256 })
    .references(() => glossaries.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 256 }),
  useDynaLink: boolean("use_dyna_link"),
});

// Schema for glossaryCategories - used to validate API requests
const baseSchema = createSelectSchema(glossaryCategories);

export const insertGlossaryCategorySchema =
  createInsertSchema(glossaryCategories);
export const insertGlossaryCategoryParams = baseSchema
  .extend({
    glossaryId: z.coerce.string().min(1),
    useDynaLink: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateGlossaryCategorySchema = baseSchema;
export const updateGlossaryCategoryParams = baseSchema.extend({
  glossaryId: z.coerce.string().min(1),
  useDynaLink: z.coerce.boolean(),
});
export const glossaryCategoryIdSchema = baseSchema.pick({ id: true });

// Types for glossaryCategories - used to type API request params and within Components
export type GlossaryCategory = typeof glossaryCategories.$inferSelect;
export type NewGlossaryCategory = z.infer<typeof insertGlossaryCategorySchema>;
export type NewGlossaryCategoryParams = z.infer<
  typeof insertGlossaryCategoryParams
>;
export type UpdateGlossaryCategoryParams = z.infer<
  typeof updateGlossaryCategoryParams
>;
export type GlossaryCategoryId = z.infer<typeof glossaryCategoryIdSchema>["id"];

// this type infers the return from getGlossaryCategories() - meaning it will include any joins
export type CompleteGlossaryCategory = Awaited<
  ReturnType<typeof getGlossaryCategories>
>["glossaryCategories"][number];
