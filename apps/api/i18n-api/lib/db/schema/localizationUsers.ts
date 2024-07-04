import { type getLocalizationUsers } from "@/lib/api/localizationUsers/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { localizationLanguages } from "./localizationLanguages";

export const localizationUsers = pgTable("localization_users", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  localizationLanguageId: varchar("localization_language_id", { length: 256 })
    .references(() => localizationLanguages.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for localizationUsers - used to validate API requests
const baseSchema = createSelectSchema(localizationUsers);

export const insertLocalizationUserSchema =
  createInsertSchema(localizationUsers);
export const insertLocalizationUserParams = baseSchema
  .extend({
    localizationLanguageId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateLocalizationUserSchema = baseSchema;
export const updateLocalizationUserParams = baseSchema
  .extend({
    localizationLanguageId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const localizationUserIdSchema = baseSchema.pick({ id: true });

// Types for localizationUsers - used to type API request params and within Components
export type LocalizationUser = typeof localizationUsers.$inferSelect;
export type NewLocalizationUser = z.infer<typeof insertLocalizationUserSchema>;
export type NewLocalizationUserParams = z.infer<
  typeof insertLocalizationUserParams
>;
export type UpdateLocalizationUserParams = z.infer<
  typeof updateLocalizationUserParams
>;
export type LocalizationUserId = z.infer<typeof localizationUserIdSchema>["id"];

// this type infers the return from getLocalizationUsers() - meaning it will include any joins
export type CompleteLocalizationUser = Awaited<
  ReturnType<typeof getLocalizationUsers>
>["localizationUsers"][number];
