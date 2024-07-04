import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getStatsUserWeeklies } from "../../api/statsUserWeeklies/queries";

export const statsUserWeeklies = pgTable("stats_user_weeklies", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  roleId: varchar("role_id", { length: 256 }),
  statsReads: varchar("stats_reads", { length: 256 }),
  statsWrites: varchar("stats_writes", { length: 256 }),
  statType: varchar("stat_type", { length: 256 }),
  timeEnd: timestamp("time_end"),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for statsUserWeeklies - used to validate API requests
const baseSchema = createSelectSchema(statsUserWeeklies);

export const insertStatsUserWeeklySchema =
  createInsertSchema(statsUserWeeklies);
export const insertStatsUserWeeklyParams = baseSchema
  .extend({
    timeEnd: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateStatsUserWeeklySchema = baseSchema;
export const updateStatsUserWeeklyParams = baseSchema
  .extend({
    timeEnd: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const statsUserWeeklyIdSchema = baseSchema.pick({ id: true });

// Types for statsUserWeeklies - used to type API request params and within Components
export type StatsUserWeekly = typeof statsUserWeeklies.$inferSelect;
export type NewStatsUserWeekly = z.infer<typeof insertStatsUserWeeklySchema>;
export type NewStatsUserWeeklyParams = z.infer<
  typeof insertStatsUserWeeklyParams
>;
export type UpdateStatsUserWeeklyParams = z.infer<
  typeof updateStatsUserWeeklyParams
>;
export type StatsUserWeeklyId = z.infer<typeof statsUserWeeklyIdSchema>["id"];

// this type infers the return from getStatsUserWeeklies() - meaning it will include any joins
export type CompleteStatsUserWeekly = Awaited<
  ReturnType<typeof getStatsUserWeeklies>
>["statsUserWeeklies"][number];
