import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { bursaries } from "./bursaries";

export const bursaryResponses = pgTable("bursary_responses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  bursaryId: varchar("bursary_id", { length: 256 })
    .references(() => bursaries.id)
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for bursaryResponses - used to validate API requests
const baseSchema = createSelectSchema(bursaryResponses).omit(timestamps);

export const insertBursaryResponseSchema =
  createInsertSchema(bursaryResponses).omit(timestamps);
export const insertBursaryResponseParams = baseSchema
  .extend({
    bursaryId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBursaryResponseSchema = baseSchema;
export const updateBursaryResponseParams = baseSchema
  .extend({
    bursaryId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const bursaryResponseIdSchema = baseSchema.pick({ id: true });

// Types for bursaryResponses - used to type API request params and within Components
export type BursaryResponse = typeof bursaryResponses.$inferSelect;
export type NewBursaryResponse = z.infer<typeof insertBursaryResponseSchema>;
export type NewBursaryResponseParams = z.infer<
  typeof insertBursaryResponseParams
>;
export type UpdateBursaryResponseParams = z.infer<
  typeof updateBursaryResponseParams
>;
export type BursaryResponseId = z.infer<typeof bursaryResponseIdSchema>["id"];


