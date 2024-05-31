import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getEnrolPaypals } from "@/lib/api/enrolPaypals/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const enrolPaypals = pgTable('enrol_paypals', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  business: varchar("business", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  instanceId: varchar("instance_id", { length: 256 }),
  itemName: varchar("item_name", { length: 256 }),
  memo: varchar("memo", { length: 256 }),
  optionName1: varchar("option_name1", { length: 256 }),
  optionName2: varchar("option_name2", { length: 256 }),
  optionSelection1X: varchar("option_selection1_x", { length: 256 }),
  optionSelection2X: varchar("option_selection2_x", { length: 256 }).notNull(),
  parentTxnId: varchar("parent_txn_id", { length: 256 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 256 }).notNull(),
  paymentType: varchar("payment_type", { length: 256 }).notNull(),
  pendingReason: varchar("pending_reason", { length: 256 }).notNull(),
  reasonCode: varchar("reason_code", { length: 256 }).notNull(),
  receiverEmail: varchar("receiver_email", { length: 256 }).notNull(),
  receiverId: varchar("receiver_id", { length: 256 }).notNull(),
  tax: varchar("tax", { length: 256 }).notNull(),
  txnId: varchar("txn_id", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for enrolPaypals - used to validate API requests
const baseSchema = createSelectSchema(enrolPaypals).omit(timestamps)

export const insertEnrolPaypalSchema = createInsertSchema(enrolPaypals).omit(timestamps);
export const insertEnrolPaypalParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateEnrolPaypalSchema = baseSchema;
export const updateEnrolPaypalParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const enrolPaypalIdSchema = baseSchema.pick({ id: true });

// Types for enrolPaypals - used to type API request params and within Components
export type EnrolPaypal = typeof enrolPaypals.$inferSelect;
export type NewEnrolPaypal = z.infer<typeof insertEnrolPaypalSchema>;
export type NewEnrolPaypalParams = z.infer<typeof insertEnrolPaypalParams>;
export type UpdateEnrolPaypalParams = z.infer<typeof updateEnrolPaypalParams>;
export type EnrolPaypalId = z.infer<typeof enrolPaypalIdSchema>["id"];
    
// this type infers the return from getEnrolPaypals() - meaning it will include any joins
export type CompleteEnrolPaypal = Awaited<ReturnType<typeof getEnrolPaypals>>["enrolPaypals"][number];

