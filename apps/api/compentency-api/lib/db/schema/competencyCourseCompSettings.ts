import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCompetencyCourseCompSettings } from "../../api/competencyCourseCompSettings/queries";

export const competencyCourseCompSettings = pgTable(
  "competency_course_comp_settings",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 }),
    pushRatingsToUserPlans: integer("push_ratings_to_user_plans"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for competencyCourseCompSettings - used to validate API requests
const baseSchema = createSelectSchema(competencyCourseCompSettings).omit(
  timestamps,
);

export const insertCompetencyCourseCompSettingSchema = createInsertSchema(
  competencyCourseCompSettings,
).omit(timestamps);
export const insertCompetencyCourseCompSettingParams = baseSchema
  .extend({
    pushRatingsToUserPlans: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyCourseCompSettingSchema = baseSchema;
export const updateCompetencyCourseCompSettingParams = baseSchema
  .extend({
    pushRatingsToUserPlans: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyCourseCompSettingIdSchema = baseSchema.pick({
  id: true,
});

// Types for competencyCourseCompSettings - used to type API request params and within Components
export type CompetencyCourseCompSetting =
  typeof competencyCourseCompSettings.$inferSelect;
export type NewCompetencyCourseCompSetting = z.infer<
  typeof insertCompetencyCourseCompSettingSchema
>;
export type NewCompetencyCourseCompSettingParams = z.infer<
  typeof insertCompetencyCourseCompSettingParams
>;
export type UpdateCompetencyCourseCompSettingParams = z.infer<
  typeof updateCompetencyCourseCompSettingParams
>;
export type CompetencyCourseCompSettingId = z.infer<
  typeof competencyCourseCompSettingIdSchema
>["id"];

// this type infers the return from getCompetencyCourseCompSettings() - meaning it will include any joins
export type CompleteCompetencyCourseCompSetting = Awaited<
  ReturnType<typeof getCompetencyCourseCompSettings>
>["competencyCourseCompSettings"][number];
