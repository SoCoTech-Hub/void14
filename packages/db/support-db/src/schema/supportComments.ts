import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { supportTickets } from "./supportTickets";

export const supportComments = pgTable("support_comments", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  comment: text("comment").notNull(),
  attachments: varchar("attachments", { length: 256 }),
  timeSpent: varchar("time_spent", { length: 256 }),
  supportTicketId: varchar("support_ticket_id", { length: 256 })
    .references(() => supportTickets.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for supportComments - used to validate API requests
const baseSchema = createSelectSchema(supportComments);

export const insertSupportCommentSchema = createInsertSchema(supportComments);
export const insertSupportCommentParams = baseSchema
  .extend({
    supportTicketId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSupportCommentSchema = baseSchema;
export const updateSupportCommentParams = baseSchema
  .extend({
    supportTicketId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const supportCommentIdSchema = baseSchema.pick({ id: true });

// Types for supportComments - used to type API request params and within Components
export type SupportComment = typeof supportComments.$inferSelect;
export type NewSupportComment = z.infer<typeof insertSupportCommentSchema>;
export type NewSupportCommentParams = z.infer<
  typeof insertSupportCommentParams
>;
export type UpdateSupportCommentParams = z.infer<
  typeof updateSupportCommentParams
>;
export type SupportCommentId = z.infer<typeof supportCommentIdSchema>["id"];
