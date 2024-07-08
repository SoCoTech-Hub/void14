import { type getMassMailMessages } from "@/lib/api/massMailMessages/queries";
import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { massMailLists } from "./massMailLists";

export const massMailMessages = pgTable(
  "mass_mail_messages",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    body: text("body"),
    publishDate: timestamp("publish_date"),
    massMailListId: varchar("mass_mail_list_id", { length: 256 })
      .references(() => massMailLists.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (massMailMessages) => {
    return {
      massMailListIdIndex: uniqueIndex("mass_mail_list_id_idx").on(
        massMailMessages.massMailListId,
      ),
    };
  },
);

// Schema for massMailMessages - used to validate API requests
const baseSchema = createSelectSchema(massMailMessages).omit(timestamps);

export const insertMassMailMessageSchema =
  createInsertSchema(massMailMessages).omit(timestamps);
export const insertMassMailMessageParams = baseSchema
  .extend({
    publishDate: z.coerce.string().min(1),
    massMailListId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMassMailMessageSchema = baseSchema;
export const updateMassMailMessageParams = baseSchema
  .extend({
    publishDate: z.coerce.string().min(1),
    massMailListId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const massMailMessageIdSchema = baseSchema.pick({ id: true });

// Types for massMailMessages - used to type API request params and within Components
export type MassMailMessage = typeof massMailMessages.$inferSelect;
export type NewMassMailMessage = z.infer<typeof insertMassMailMessageSchema>;
export type NewMassMailMessageParams = z.infer<
  typeof insertMassMailMessageParams
>;
export type UpdateMassMailMessageParams = z.infer<
  typeof updateMassMailMessageParams
>;
export type MassMailMessageId = z.infer<typeof massMailMessageIdSchema>["id"];

// this type infers the return from getMassMailMessages() - meaning it will include any joins
export type CompleteMassMailMessage = Awaited<
  ReturnType<typeof getMassMailMessages>
>["massMailMessages"][number];
