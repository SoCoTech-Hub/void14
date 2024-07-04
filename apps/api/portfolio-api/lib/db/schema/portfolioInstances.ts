import { boolean, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getPortfolioInstances } from "../api/portfolioInstances/queries";

export const portfolioInstances = pgTable(
  "portfolio_instances",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }),
    plugin: varchar("plugin", { length: 256 }),
    visible: boolean("visible").notNull(),
  },
  (portfolioInstances) => {
    return {
      visibleIndex: uniqueIndex("portfolio_instances_visible_idx").on(
        portfolioInstances.visible,
      ),
    };
  },
);

// Schema for portfolioInstances - used to validate API requests
const baseSchema = createSelectSchema(portfolioInstances);

export const insertPortfolioInstanceSchema =
  createInsertSchema(portfolioInstances);
export const insertPortfolioInstanceParams = baseSchema
  .extend({
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updatePortfolioInstanceSchema = baseSchema;
export const updatePortfolioInstanceParams = baseSchema.extend({
  visible: z.coerce.boolean(),
});
export const portfolioInstanceIdSchema = baseSchema.pick({ id: true });

// Types for portfolioInstances - used to type API request params and within Components
export type PortfolioInstance = typeof portfolioInstances.$inferSelect;
export type NewPortfolioInstance = z.infer<
  typeof insertPortfolioInstanceSchema
>;
export type NewPortfolioInstanceParams = z.infer<
  typeof insertPortfolioInstanceParams
>;
export type UpdatePortfolioInstanceParams = z.infer<
  typeof updatePortfolioInstanceParams
>;
export type PortfolioInstanceId = z.infer<
  typeof portfolioInstanceIdSchema
>["id"];

// this type infers the return from getPortfolioInstances() - meaning it will include any joins
export type CompletePortfolioInstance = Awaited<
  ReturnType<typeof getPortfolioInstances>
>["portfolioInstances"][number];
