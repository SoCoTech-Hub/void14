import { type getLocalizationLanguages } from "@/lib/api/localizationLanguages/queries";
import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const localizationLanguages = pgTable(
  "localization_languages",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    flag: varchar("flag", { length: 256 }),
    countryId: varchar("country_id", { length: 256 }),
  },
  (localizationLanguages) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(localizationLanguages.name),
    };
  },
);

// Schema for localizationLanguages - used to validate API requests
const baseSchema = createSelectSchema(localizationLanguages);

export const insertLocalizationLanguageSchema = createInsertSchema(
  localizationLanguages,
);
export const insertLocalizationLanguageParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateLocalizationLanguageSchema = baseSchema;
export const updateLocalizationLanguageParams = baseSchema.extend({});
export const localizationLanguageIdSchema = baseSchema.pick({ id: true });

// Types for localizationLanguages - used to type API request params and within Components
export type LocalizationLanguage = typeof localizationLanguages.$inferSelect;
export type NewLocalizationLanguage = z.infer<
  typeof insertLocalizationLanguageSchema
>;
export type NewLocalizationLanguageParams = z.infer<
  typeof insertLocalizationLanguageParams
>;
export type UpdateLocalizationLanguageParams = z.infer<
  typeof updateLocalizationLanguageParams
>;
export type LocalizationLanguageId = z.infer<
  typeof localizationLanguageIdSchema
>["id"];

// this type infers the return from getLocalizationLanguages() - meaning it will include any joins
export type CompleteLocalizationLanguage = Awaited<
  ReturnType<typeof getLocalizationLanguages>
>["localizationLanguages"][number];
