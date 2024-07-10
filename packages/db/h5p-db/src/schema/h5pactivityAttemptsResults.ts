import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const h5pactivityAttemptsResults = pgTable(
  "h5pactivity_attempts_results",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    additionals: text("additionals"),
    attemptId: varchar("attempt_id", { length: 256 }),
    completion: boolean("completion"),
    correctPattern: text("correct_pattern"),
    description: text("description"),
    duration: integer("duration"),
    interactionType: varchar("interaction_type", { length: 256 }),
    maxScore: integer("max_score"),
    rawScore: integer("raw_score"),
    response: text("response"),
    subContent: varchar("sub_content", { length: 256 }),
    subContent: boolean("sub_content"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for h5pactivityAttemptsResults - used to validate API requests
const baseSchema = createSelectSchema(h5pactivityAttemptsResults).omit(
  timestamps,
);

export const insertH5pactivityAttemptsResultSchema = createInsertSchema(
  h5pactivityAttemptsResults,
).omit(timestamps);
export const insertH5pactivityAttemptsResultParams = baseSchema
  .extend({
    completion: z.coerce.boolean(),
    duration: z.coerce.number(),
    maxScore: z.coerce.number(),
    rawScore: z.coerce.number(),
    subContent: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateH5pactivityAttemptsResultSchema = baseSchema;
export const updateH5pactivityAttemptsResultParams = baseSchema.extend({
  completion: z.coerce.boolean(),
  duration: z.coerce.number(),
  maxScore: z.coerce.number(),
  rawScore: z.coerce.number(),
  subContent: z.coerce.boolean(),
});
export const h5pactivityAttemptsResultIdSchema = baseSchema.pick({ id: true });

// Types for h5pactivityAttemptsResults - used to type API request params and within Components
export type H5pactivityAttemptsResult =
  typeof h5pactivityAttemptsResults.$inferSelect;
export type NewH5pactivityAttemptsResult = z.infer<
  typeof insertH5pactivityAttemptsResultSchema
>;
export type NewH5pactivityAttemptsResultParams = z.infer<
  typeof insertH5pactivityAttemptsResultParams
>;
export type UpdateH5pactivityAttemptsResultParams = z.infer<
  typeof updateH5pactivityAttemptsResultParams
>;
export type H5pactivityAttemptsResultId = z.infer<
  typeof h5pactivityAttemptsResultIdSchema
>["id"];
