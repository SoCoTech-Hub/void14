import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getPaymentAccounts } from "../api/paymentAccounts/queries";

export const paymentAccounts = pgTable(
  "payment_accounts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    archived: boolean("archived"),
    contextId: varchar("context_id", { length: 256 }),
    enabled: boolean("enabled"),
    idNumber: varchar("id_number", { length: 256 }),
    name: varchar("name", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (paymentAccounts) => {
    return {
      contextIdIndex: uniqueIndex("payment_accounts_context_id_idx").on(
        paymentAccounts.contextId,
      ),
    };
  },
);

// Schema for paymentAccounts - used to validate API requests
const baseSchema = createSelectSchema(paymentAccounts).omit(timestamps);

export const insertPaymentAccountSchema =
  createInsertSchema(paymentAccounts).omit(timestamps);
export const insertPaymentAccountParams = baseSchema
  .extend({
    archived: z.coerce.boolean(),
    enabled: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updatePaymentAccountSchema = baseSchema;
export const updatePaymentAccountParams = baseSchema.extend({
  archived: z.coerce.boolean(),
  enabled: z.coerce.boolean(),
});
export const paymentAccountIdSchema = baseSchema.pick({ id: true });

// Types for paymentAccounts - used to type API request params and within Components
export type PaymentAccount = typeof paymentAccounts.$inferSelect;
export type NewPaymentAccount = z.infer<typeof insertPaymentAccountSchema>;
export type NewPaymentAccountParams = z.infer<
  typeof insertPaymentAccountParams
>;
export type UpdatePaymentAccountParams = z.infer<
  typeof updatePaymentAccountParams
>;
export type PaymentAccountId = z.infer<typeof paymentAccountIdSchema>["id"];

// this type infers the return from getPaymentAccounts() - meaning it will include any joins
export type CompletePaymentAccount = Awaited<
  ReturnType<typeof getPaymentAccounts>
>["paymentAccounts"][number];
