import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getPortfolioInstanceConfigs } from "../api/portfolioInstanceConfigs/queries";
import { portfolioInstances } from "./portfolioInstances";

export const portfolioInstanceConfigs = pgTable(
  "portfolio_instance_configs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    portfolioInstanceId: varchar("portfolio_instance_id", { length: 256 })
      .references(() => portfolioInstances.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    value: text("value"),
  },
  (portfolioInstanceConfigs) => {
    return {
      portfolioInstanceIdIndex: uniqueIndex(
        "portfolio_instance_configs_portfolio_instance_id_idx",
      ).on(portfolioInstanceConfigs.portfolioInstanceId),
    };
  },
);

// Schema for portfolioInstanceConfigs - used to validate API requests
const baseSchema = createSelectSchema(portfolioInstanceConfigs);

export const insertPortfolioInstanceConfigSchema = createInsertSchema(
  portfolioInstanceConfigs,
);
export const insertPortfolioInstanceConfigParams = baseSchema
  .extend({
    portfolioInstanceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updatePortfolioInstanceConfigSchema = baseSchema;
export const updatePortfolioInstanceConfigParams = baseSchema.extend({
  portfolioInstanceId: z.coerce.string().min(1),
});
export const portfolioInstanceConfigIdSchema = baseSchema.pick({ id: true });

// Types for portfolioInstanceConfigs - used to type API request params and within Components
export type PortfolioInstanceConfig =
  typeof portfolioInstanceConfigs.$inferSelect;
export type NewPortfolioInstanceConfig = z.infer<
  typeof insertPortfolioInstanceConfigSchema
>;
export type NewPortfolioInstanceConfigParams = z.infer<
  typeof insertPortfolioInstanceConfigParams
>;
export type UpdatePortfolioInstanceConfigParams = z.infer<
  typeof updatePortfolioInstanceConfigParams
>;
export type PortfolioInstanceConfigId = z.infer<
  typeof portfolioInstanceConfigIdSchema
>["id"];

// this type infers the return from getPortfolioInstanceConfigs() - meaning it will include any joins
export type CompletePortfolioInstanceConfig = Awaited<
  ReturnType<typeof getPortfolioInstanceConfigs>
>["portfolioInstanceConfigs"][number];
