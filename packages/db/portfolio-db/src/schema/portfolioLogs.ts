import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { portfolioInstances } from "./portfolioInstances";
import { portfolioTempdatas } from "./portfolioTempdatas";

export const portfolioLogs = pgTable(
  "portfolio_logs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    callerClass: varchar("caller_class", { length: 256 }),
    callerComponent: varchar("caller_component", { length: 256 }),
    callerFile: varchar("caller_file", { length: 256 }).notNull(),
    callerSha1: varchar("caller_sha1", { length: 256 }).notNull(),
    continueUrl: varchar("continue_url", { length: 256 }).notNull(),
    portfolioInstanceId: varchar("portfolio_instance_id", { length: 256 })
      .references(() => portfolioInstances.id)
      .notNull(),
    returnUrl: varchar("return_url", { length: 256 }).notNull(),
    portfolioTempdataId: varchar("portfolio_tempdata_id", { length: 256 })
      .references(() => portfolioTempdatas.id)
      .notNull(),
    time: integer("time"),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (portfolioLogs) => {
    return {
      portfolioInstanceIdIndex: uniqueIndex("portfolio_instance_id_idx").on(
        portfolioLogs.portfolioInstanceId,
      ),
    };
  },
);

// Schema for portfolioLogs - used to validate API requests
const baseSchema = createSelectSchema(portfolioLogs);

export const insertPortfolioLogSchema = createInsertSchema(portfolioLogs);
export const insertPortfolioLogParams = baseSchema
  .extend({
    portfolioInstanceId: z.coerce.string().min(1),
    portfolioTempdataId: z.coerce.string().min(1),
    time: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePortfolioLogSchema = baseSchema;
export const updatePortfolioLogParams = baseSchema
  .extend({
    portfolioInstanceId: z.coerce.string().min(1),
    portfolioTempdataId: z.coerce.string().min(1),
    time: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const portfolioLogIdSchema = baseSchema.pick({ id: true });

// Types for portfolioLogs - used to type API request params and within Components
export type PortfolioLog = typeof portfolioLogs.$inferSelect;
export type NewPortfolioLog = z.infer<typeof insertPortfolioLogSchema>;
export type NewPortfolioLogParams = z.infer<typeof insertPortfolioLogParams>;
export type UpdatePortfolioLogParams = z.infer<typeof updatePortfolioLogParams>;
export type PortfolioLogId = z.infer<typeof portfolioLogIdSchema>["id"];

