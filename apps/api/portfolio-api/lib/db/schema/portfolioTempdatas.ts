import { type getPortfolioTempdatas } from "@/lib/api/portfolioTempdatas/queries";
import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { portfolioInstances } from "./portfolioInstances";

export const portfolioTempdatas = pgTable(
  "portfolio_tempdatas",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    data: text("data"),
    expiryTime: integer("expiry_time").notNull(),
    portfolioInstanceId: varchar("portfolio_instance_id", { length: 256 })
      .references(() => portfolioInstances.id, { onDelete: "cascade" })
      .notNull(),
    queued: boolean("queued").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (portfolioTempdatas) => {
    return {
      portfolioInstanceIdIndex: uniqueIndex(
        "portfolio_tempdatas_portfolio_instance_id_idx",
      ).on(portfolioTempdatas.portfolioInstanceId),
    };
  },
);

// Schema for portfolioTempdatas - used to validate API requests
const baseSchema = createSelectSchema(portfolioTempdatas);

export const insertPortfolioTempdataSchema =
  createInsertSchema(portfolioTempdatas);
export const insertPortfolioTempdataParams = baseSchema
  .extend({
    expiryTime: z.coerce.number(),
    portfolioInstanceId: z.coerce.string().min(1),
    queued: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePortfolioTempdataSchema = baseSchema;
export const updatePortfolioTempdataParams = baseSchema
  .extend({
    expiryTime: z.coerce.number(),
    portfolioInstanceId: z.coerce.string().min(1),
    queued: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const portfolioTempdataIdSchema = baseSchema.pick({ id: true });

// Types for portfolioTempdatas - used to type API request params and within Components
export type PortfolioTempdata = typeof portfolioTempdatas.$inferSelect;
export type NewPortfolioTempdata = z.infer<
  typeof insertPortfolioTempdataSchema
>;
export type NewPortfolioTempdataParams = z.infer<
  typeof insertPortfolioTempdataParams
>;
export type UpdatePortfolioTempdataParams = z.infer<
  typeof updatePortfolioTempdataParams
>;
export type PortfolioTempdataId = z.infer<
  typeof portfolioTempdataIdSchema
>["id"];

// this type infers the return from getPortfolioTempdatas() - meaning it will include any joins
export type CompletePortfolioTempdata = Awaited<
  ReturnType<typeof getPortfolioTempdatas>
>["portfolioTempdatas"][number];
