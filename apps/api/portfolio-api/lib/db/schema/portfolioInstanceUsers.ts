import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getPortfolioInstanceUsers } from "../../api/portfolioInstanceUsers/queries";
import { portfolioInstances } from "./portfolioInstances";

export const portfolioInstanceUsers = pgTable(
  "portfolio_instance_users",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    portfolioInstanceId: varchar("portfolio_instance_id", { length: 256 })
      .references(() => portfolioInstances.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 256 }),
    value: text("value"),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (portfolioInstanceUsers) => {
    return {
      portfolioInstanceIdIndex: uniqueIndex(
        "portfolio_instance_users_portfolio_instance_id_idx",
      ).on(portfolioInstanceUsers.portfolioInstanceId),
    };
  },
);

// Schema for portfolioInstanceUsers - used to validate API requests
const baseSchema = createSelectSchema(portfolioInstanceUsers);

export const insertPortfolioInstanceUserSchema = createInsertSchema(
  portfolioInstanceUsers,
);
export const insertPortfolioInstanceUserParams = baseSchema
  .extend({
    portfolioInstanceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePortfolioInstanceUserSchema = baseSchema;
export const updatePortfolioInstanceUserParams = baseSchema
  .extend({
    portfolioInstanceId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const portfolioInstanceUserIdSchema = baseSchema.pick({ id: true });

// Types for portfolioInstanceUsers - used to type API request params and within Components
export type PortfolioInstanceUser = typeof portfolioInstanceUsers.$inferSelect;
export type NewPortfolioInstanceUser = z.infer<
  typeof insertPortfolioInstanceUserSchema
>;
export type NewPortfolioInstanceUserParams = z.infer<
  typeof insertPortfolioInstanceUserParams
>;
export type UpdatePortfolioInstanceUserParams = z.infer<
  typeof updatePortfolioInstanceUserParams
>;
export type PortfolioInstanceUserId = z.infer<
  typeof portfolioInstanceUserIdSchema
>["id"];

// this type infers the return from getPortfolioInstanceUsers() - meaning it will include any joins
export type CompletePortfolioInstanceUser = Awaited<
  ReturnType<typeof getPortfolioInstanceUsers>
>["portfolioInstanceUsers"][number];
