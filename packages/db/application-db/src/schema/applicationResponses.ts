
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { jobApplications } from "./jobApplications";

export const applicationResponses = pgTable("application_responses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  jobApplicationId: varchar("job_application_id", { length: 256 })
    .references(() => jobApplications.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for applicationResponses - used to validate API requests
const baseSchema = createSelectSchema(applicationResponses).omit(timestamps);

export const insertApplicationResponseSchema =
  createInsertSchema(applicationResponses).omit(timestamps);
export const insertApplicationResponseParams = baseSchema
  .extend({
    jobApplicationId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateApplicationResponseSchema = baseSchema;
export const updateApplicationResponseParams = baseSchema
  .extend({
    jobApplicationId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const applicationResponseIdSchema = baseSchema.pick({ id: true });

// Types for applicationResponses - used to type API request params and within Components
export type ApplicationResponse = typeof applicationResponses.$inferSelect;
export type NewApplicationResponse = z.infer<
  typeof insertApplicationResponseSchema
>;
export type NewApplicationResponseParams = z.infer<
  typeof insertApplicationResponseParams
>;
export type UpdateApplicationResponseParams = z.infer<
  typeof updateApplicationResponseParams
>;
export type ApplicationResponseId = z.infer<
  typeof applicationResponseIdSchema
>["id"];

