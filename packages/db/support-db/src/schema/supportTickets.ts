import { type getSupportTickets } from "@/lib/api/supportTickets/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { supportDepartments } from "./supportDepartments";
import { supportStatuses } from "./supportStatuses";
import { supportTopics } from "./supportTopics";

export const supportTickets = pgTable(
  "support_tickets",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    descrption: text("descrption"),
    attachments: varchar("attachments", { length: 256 }),
    timeSpent: varchar("time_spent", { length: 256 }),
    open: boolean("open"),
    path: varchar("path", { length: 256 }),
    device: text("device"),
    assignedTo: varchar("assigned_to", { length: 256 }),
    supportDepartmentId: varchar("support_department_id", { length: 256 })
      .references(() => supportDepartments.id, { onDelete: "cascade" })
      .notNull(),
    supportTopicId: varchar("support_topic_id", { length: 256 })
      .references(() => supportTopics.id, { onDelete: "cascade" })
      .notNull(),
    supportStatusId: varchar("support_status_id", { length: 256 })
      .references(() => supportStatuses.id, { onDelete: "cascade" })
      .notNull(),
    province: varchar("province", { length: 256 }),
    grade: varchar("grade", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (supportTickets) => {
    return {
      supportDepartmentIdIndex: uniqueIndex("support_department_id_idx").on(
        supportTickets.supportDepartmentId,
      ),
    };
  },
);

// Schema for supportTickets - used to validate API requests
const baseSchema = createSelectSchema(supportTickets).omit(timestamps);

export const insertSupportTicketSchema =
  createInsertSchema(supportTickets).omit(timestamps);
export const insertSupportTicketParams = baseSchema
  .extend({
    open: z.coerce.boolean(),
    supportDepartmentId: z.coerce.string().min(1),
    supportTopicId: z.coerce.string().min(1),
    supportStatusId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSupportTicketSchema = baseSchema;
export const updateSupportTicketParams = baseSchema
  .extend({
    open: z.coerce.boolean(),
    supportDepartmentId: z.coerce.string().min(1),
    supportTopicId: z.coerce.string().min(1),
    supportStatusId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const supportTicketIdSchema = baseSchema.pick({ id: true });

// Types for supportTickets - used to type API request params and within Components
export type SupportTicket = typeof supportTickets.$inferSelect;
export type NewSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type NewSupportTicketParams = z.infer<typeof insertSupportTicketParams>;
export type UpdateSupportTicketParams = z.infer<
  typeof updateSupportTicketParams
>;
export type SupportTicketId = z.infer<typeof supportTicketIdSchema>["id"];

// this type infers the return from getSupportTickets() - meaning it will include any joins
export type CompleteSupportTicket = Awaited<
  ReturnType<typeof getSupportTickets>
>["supportTickets"][number];
