import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getLocalizationTranslations } from "../api/localizationTranslations/queries";
import { localizationFields } from "./localizationFields";
import { localizationLanguages } from "./localizationLanguages";

export const localizationTranslations = pgTable("localization_translations", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  localizationFieldId: varchar("localization_field_id", { length: 256 })
    .references(() => localizationFields.id, { onDelete: "cascade" })
    .notNull(),
  localizationLanguageId: varchar("localization_language_id", { length: 256 })
    .references(() => localizationLanguages.id, { onDelete: "cascade" })
    .notNull(),
  value: varchar("value", { length: 256 }),
});

// Schema for localizationTranslations - used to validate API requests
const baseSchema = createSelectSchema(localizationTranslations);

export const insertLocalizationTranslationSchema = createInsertSchema(
  localizationTranslations,
);
export const insertLocalizationTranslationParams = baseSchema
  .extend({
    localizationFieldId: z.coerce.string().min(1),
    localizationLanguageId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateLocalizationTranslationSchema = baseSchema;
export const updateLocalizationTranslationParams = baseSchema.extend({
  localizationFieldId: z.coerce.string().min(1),
  localizationLanguageId: z.coerce.string().min(1),
});
export const localizationTranslationIdSchema = baseSchema.pick({ id: true });

// Types for localizationTranslations - used to type API request params and within Components
export type LocalizationTranslation =
  typeof localizationTranslations.$inferSelect;
export type NewLocalizationTranslation = z.infer<
  typeof insertLocalizationTranslationSchema
>;
export type NewLocalizationTranslationParams = z.infer<
  typeof insertLocalizationTranslationParams
>;
export type UpdateLocalizationTranslationParams = z.infer<
  typeof updateLocalizationTranslationParams
>;
export type LocalizationTranslationId = z.infer<
  typeof localizationTranslationIdSchema
>["id"];

// this type infers the return from getLocalizationTranslations() - meaning it will include any joins
export type CompleteLocalizationTranslation = Awaited<
  ReturnType<typeof getLocalizationTranslations>
>["localizationTranslations"][number];
