import { type getStatsDailies } from "@/lib/api/statsDailies/queries";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const statsDailies = pgTable("stats_dailies", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  roleId: varchar("role_id", { length: 256 }),
  stat1: varchar("stat1", { length: 256 }),
  stat2: varchar("stat2", { length: 256 }),
  statType: varchar("stat_type", { length: 256 }),
  timeEnd: timestamp("time_end"),
});

// Schema for statsDailies - used to validate API requests
const baseSchema = createSelectSchema(statsDailies);

export const insertStatsDailySchema = createInsertSchema(statsDailies);
export const insertStatsDailyParams = baseSchema
  .extend({
    timeEnd: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateStatsDailySchema = baseSchema;
export const updateStatsDailyParams = baseSchema.extend({
  timeEnd: z.coerce.string().min(1),
});
export const statsDailyIdSchema = baseSchema.pick({ id: true });

// Types for statsDailies - used to type API request params and within Components
export type StatsDaily = typeof statsDailies.$inferSelect;
export type NewStatsDaily = z.infer<typeof insertStatsDailySchema>;
export type NewStatsDailyParams = z.infer<typeof insertStatsDailyParams>;
export type UpdateStatsDailyParams = z.infer<typeof updateStatsDailyParams>;
export type StatsDailyId = z.infer<typeof statsDailyIdSchema>["id"];

// this type infers the return from getStatsDailies() - meaning it will include any joins
export type CompleteStatsDaily = Awaited<
  ReturnType<typeof getStatsDailies>
>["statsDailies"][number];
