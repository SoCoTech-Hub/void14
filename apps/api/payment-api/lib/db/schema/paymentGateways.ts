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

import { type getPaymentGateways } from "../../api/paymentGateways/queries";
import { paymentAccounts } from "./paymentAccounts";

export const paymentGateways = pgTable(
  "payment_gateways",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    paymentAccountId: varchar("payment_account_id", { length: 256 })
      .references(() => paymentAccounts.id, { onDelete: "cascade" })
      .notNull(),
    config: text("config"),
    enabled: boolean("enabled").notNull(),
    gatewayName: varchar("gateway_name", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (paymentGateways) => {
    return {
      paymentAccountIdIndex: uniqueIndex(
        "payment_gateways_payment_account_id_idx",
      ).on(paymentGateways.paymentAccountId),
    };
  },
);

// Schema for paymentGateways - used to validate API requests
const baseSchema = createSelectSchema(paymentGateways).omit(timestamps);

export const insertPaymentGatewaySchema =
  createInsertSchema(paymentGateways).omit(timestamps);
export const insertPaymentGatewayParams = baseSchema
  .extend({
    paymentAccountId: z.coerce.string().min(1),
    enabled: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updatePaymentGatewaySchema = baseSchema;
export const updatePaymentGatewayParams = baseSchema.extend({
  paymentAccountId: z.coerce.string().min(1),
  enabled: z.coerce.boolean(),
});
export const paymentGatewayIdSchema = baseSchema.pick({ id: true });

// Types for paymentGateways - used to type API request params and within Components
export type PaymentGateway = typeof paymentGateways.$inferSelect;
export type NewPaymentGateway = z.infer<typeof insertPaymentGatewaySchema>;
export type NewPaymentGatewayParams = z.infer<
  typeof insertPaymentGatewayParams
>;
export type UpdatePaymentGatewayParams = z.infer<
  typeof updatePaymentGatewayParams
>;
export type PaymentGatewayId = z.infer<typeof paymentGatewayIdSchema>["id"];

// this type infers the return from getPaymentGateways() - meaning it will include any joins
export type CompletePaymentGateway = Awaited<
  ReturnType<typeof getPaymentGateways>
>["paymentGateways"][number];
