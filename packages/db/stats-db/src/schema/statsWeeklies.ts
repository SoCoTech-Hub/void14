import { type getStatsWeeklies } from "@/lib/api/statsWeeklies/queries";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const statsWeeklies = pgTable("stats_weeklies", {
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

// Schema for statsWeeklies - used to validate API requests
const baseSchema = createSelectSchema(statsWeeklies);

export const insertStatsWeeklySchema = createInsertSchema(statsWeeklies);
export const insertStatsWeeklyParams = baseSchema
  .extend({
    timeEnd: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateStatsWeeklySchema = baseSchema;
export const updateStatsWeeklyParams = baseSchema.extend({
  timeEnd: z.coerce.string().min(1),
});
export const statsWeeklyIdSchema = baseSchema.pick({ id: true });

// Types for statsWeeklies - used to type API request params and within Components
export type StatsWeekly = typeof statsWeeklies.$inferSelect;
export type NewStatsWeekly = z.infer<typeof insertStatsWeeklySchema>;
export type NewStatsWeeklyParams = z.infer<typeof insertStatsWeeklyParams>;
export type UpdateStatsWeeklyParams = z.infer<typeof updateStatsWeeklyParams>;
export type StatsWeeklyId = z.infer<typeof statsWeeklyIdSchema>["id"];

// this type infers the return from getStatsWeeklies() - meaning it will include any joins
export type CompleteStatsWeekly = Awaited<
  ReturnType<typeof getStatsWeeklies>
>["statsWeeklies"][number];
