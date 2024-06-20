import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { portfolioTempdatas } from "./portfolioTempdatas"
import { type getPortfolioMaharaQueues } from "@/lib/api/portfolioMaharaQueues/queries";

import { nanoid } from "@/lib/utils";


export const portfolioMaharaQueues = pgTable('portfolio_mahara_queues', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  token: varchar("token", { length: 256 }).notNull(),
  portfolioTempdataId: varchar("portfolio_tempdata_id", { length: 256 }).references(() => portfolioTempdatas.id, { onDelete: "cascade" }).notNull()
}, (portfolioMaharaQueues) => {
  return {
    portfolioTempdataIdIndex: uniqueIndex('portfolio_tempdata_id_idx').on(portfolioMaharaQueues.portfolioTempdataId),
  }
});


// Schema for portfolioMaharaQueues - used to validate API requests
const baseSchema = createSelectSchema(portfolioMaharaQueues)

export const insertPortfolioMaharaQueueSchema = createInsertSchema(portfolioMaharaQueues);
export const insertPortfolioMaharaQueueParams = baseSchema.extend({
  portfolioTempdataId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updatePortfolioMaharaQueueSchema = baseSchema;
export const updatePortfolioMaharaQueueParams = baseSchema.extend({
  portfolioTempdataId: z.coerce.string().min(1)
})
export const portfolioMaharaQueueIdSchema = baseSchema.pick({ id: true });

// Types for portfolioMaharaQueues - used to type API request params and within Components
export type PortfolioMaharaQueue = typeof portfolioMaharaQueues.$inferSelect;
export type NewPortfolioMaharaQueue = z.infer<typeof insertPortfolioMaharaQueueSchema>;
export type NewPortfolioMaharaQueueParams = z.infer<typeof insertPortfolioMaharaQueueParams>;
export type UpdatePortfolioMaharaQueueParams = z.infer<typeof updatePortfolioMaharaQueueParams>;
export type PortfolioMaharaQueueId = z.infer<typeof portfolioMaharaQueueIdSchema>["id"];
    
// this type infers the return from getPortfolioMaharaQueues() - meaning it will include any joins
export type CompletePortfolioMaharaQueue = Awaited<ReturnType<typeof getPortfolioMaharaQueues>>["portfolioMaharaQueues"][number];

