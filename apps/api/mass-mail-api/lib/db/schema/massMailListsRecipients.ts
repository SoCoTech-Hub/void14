import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getMassMailListsRecipients } from "../../api/massMailListsRecipients/queries";
import { massMailLists } from "./massMailLists";
import { massMailRecipients } from "./massMailRecipients";

export const massMailListsRecipients = pgTable("mass_mail_lists_recipients", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  massMailListId: varchar("mass_mail_list_id", { length: 256 })
    .references(() => massMailLists.id, { onDelete: "cascade" })
    .notNull(),
  massMailRecipientId: varchar("mass_mail_recipient_id", { length: 256 })
    .references(() => massMailRecipients.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for massMailListsRecipients - used to validate API requests
const baseSchema = createSelectSchema(massMailListsRecipients);

export const insertMassMailListsRecipientSchema = createInsertSchema(
  massMailListsRecipients,
);
export const insertMassMailListsRecipientParams = baseSchema
  .extend({
    massMailListId: z.coerce.string().min(1),
    massMailRecipientId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateMassMailListsRecipientSchema = baseSchema;
export const updateMassMailListsRecipientParams = baseSchema.extend({
  massMailListId: z.coerce.string().min(1),
  massMailRecipientId: z.coerce.string().min(1),
});
export const massMailListsRecipientIdSchema = baseSchema.pick({ id: true });

// Types for massMailListsRecipients - used to type API request params and within Components
export type MassMailListsRecipient =
  typeof massMailListsRecipients.$inferSelect;
export type NewMassMailListsRecipient = z.infer<
  typeof insertMassMailListsRecipientSchema
>;
export type NewMassMailListsRecipientParams = z.infer<
  typeof insertMassMailListsRecipientParams
>;
export type UpdateMassMailListsRecipientParams = z.infer<
  typeof updateMassMailListsRecipientParams
>;
export type MassMailListsRecipientId = z.infer<
  typeof massMailListsRecipientIdSchema
>["id"];

// this type infers the return from getMassMailListsRecipients() - meaning it will include any joins
export type CompleteMassMailListsRecipient = Awaited<
  ReturnType<typeof getMassMailListsRecipients>
>["massMailListsRecipients"][number];
