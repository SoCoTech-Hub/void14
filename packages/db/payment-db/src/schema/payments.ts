import { type getPayments } from "@/lib/api/payments/queries";
import { sql } from "drizzle-orm";
import { pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { paymentAccounts } from "./paymentAccounts";

export const payments = pgTable(
  "payments",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    paymentAccountId: varchar("payment_account_id", { length: 256 })
      .references(() => paymentAccounts.id, { onDelete: "cascade" })
      .notNull(),
    component: varchar("component", { length: 256 }),
    amount: real("amount").notNull(),
    currency: varchar("currency", { length: 256 }).notNull(),
    gateway: varchar("gateway", { length: 256 }).notNull(),
    itemId: varchar("item_id", { length: 256 }).notNull(),
    paymentArea: varchar("payment_area", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (payments) => {
    return {
      paymentAccountIdIndex: uniqueIndex("payment_account_id_idx").on(
        payments.paymentAccountId,
      ),
    };
  },
);

// Schema for payments - used to validate API requests
const baseSchema = createSelectSchema(payments).omit(timestamps);

export const insertPaymentSchema =
  createInsertSchema(payments).omit(timestamps);
export const insertPaymentParams = baseSchema
  .extend({
    paymentAccountId: z.coerce.string().min(1),
    amount: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePaymentSchema = baseSchema;
export const updatePaymentParams = baseSchema
  .extend({
    paymentAccountId: z.coerce.string().min(1),
    amount: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const paymentIdSchema = baseSchema.pick({ id: true });

// Types for payments - used to type API request params and within Components
export type Payment = typeof payments.$inferSelect;
export type NewPayment = z.infer<typeof insertPaymentSchema>;
export type NewPaymentParams = z.infer<typeof insertPaymentParams>;
export type UpdatePaymentParams = z.infer<typeof updatePaymentParams>;
export type PaymentId = z.infer<typeof paymentIdSchema>["id"];

// this type infers the return from getPayments() - meaning it will include any joins
export type CompletePayment = Awaited<
  ReturnType<typeof getPayments>
>["payments"][number];
