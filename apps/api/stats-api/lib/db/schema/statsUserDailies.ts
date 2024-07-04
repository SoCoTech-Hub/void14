import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getStatsUserDailies } from "../../api/statsUserDailies/queries";

export const statsUserDailies = pgTable("stats_user_dailies", {
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

// Schema for statsUserDailies - used to validate API requests
const baseSchema = createSelectSchema(statsUserDailies);

export const insertStatsUserDailySchema = createInsertSchema(statsUserDailies);
export const insertStatsUserDailyParams = baseSchema
  .extend({
    timeEnd: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateStatsUserDailySchema = baseSchema;
export const updateStatsUserDailyParams = baseSchema
  .extend({
    timeEnd: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const statsUserDailyIdSchema = baseSchema.pick({ id: true });

// Types for statsUserDailies - used to type API request params and within Components
export type StatsUserDaily = typeof statsUserDailies.$inferSelect;
export type NewStatsUserDaily = z.infer<typeof insertStatsUserDailySchema>;
export type NewStatsUserDailyParams = z.infer<
  typeof insertStatsUserDailyParams
>;
export type UpdateStatsUserDailyParams = z.infer<
  typeof updateStatsUserDailyParams
>;
export type StatsUserDailyId = z.infer<typeof statsUserDailyIdSchema>["id"];

// this type infers the return from getStatsUserDailies() - meaning it will include any joins
export type CompleteStatsUserDaily = Awaited<
  ReturnType<typeof getStatsUserDailies>
>["statsUserDailies"][number];
