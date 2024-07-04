import { boolean, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getInmailResponses } from "../../api/inmailResponses/queries";
import { inmails } from "./inmails";

export const inmailResponses = pgTable(
  "inmail_responses",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    read: boolean("read"),
    starred: boolean("starred"),
    important: boolean("important"),
    deleted: boolean("deleted"),
    label: varchar("label", { length: 256 }),
    inmailId: varchar("inmail_id", { length: 256 })
      .references(() => inmails.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (inmailResponses) => {
    return {
      inmailIdIndex: uniqueIndex("inmail_id_idx").on(inmailResponses.inmailId),
    };
  },
);

// Schema for inmailResponses - used to validate API requests
const baseSchema = createSelectSchema(inmailResponses);

export const insertInmailResponseSchema = createInsertSchema(inmailResponses);
export const insertInmailResponseParams = baseSchema
  .extend({
    read: z.coerce.boolean(),
    starred: z.coerce.boolean(),
    important: z.coerce.boolean(),
    deleted: z.coerce.boolean(),
    inmailId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateInmailResponseSchema = baseSchema;
export const updateInmailResponseParams = baseSchema
  .extend({
    read: z.coerce.boolean(),
    starred: z.coerce.boolean(),
    important: z.coerce.boolean(),
    deleted: z.coerce.boolean(),
    inmailId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const inmailResponseIdSchema = baseSchema.pick({ id: true });

// Types for inmailResponses - used to type API request params and within Components
export type InmailResponse = typeof inmailResponses.$inferSelect;
export type NewInmailResponse = z.infer<typeof insertInmailResponseSchema>;
export type NewInmailResponseParams = z.infer<
  typeof insertInmailResponseParams
>;
export type UpdateInmailResponseParams = z.infer<
  typeof updateInmailResponseParams
>;
export type InmailResponseId = z.infer<typeof inmailResponseIdSchema>["id"];

// this type infers the return from getInmailResponses() - meaning it will include any joins
export type CompleteInmailResponse = Awaited<
  ReturnType<typeof getInmailResponses>
>["inmailResponses"][number];
