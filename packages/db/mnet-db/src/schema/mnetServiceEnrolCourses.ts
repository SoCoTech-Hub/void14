import { integer, pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { mnetHosts } from "./mnetHosts";

export const mnetServiceEnrolCourses = pgTable(
  "mnet_service_enrol_courses",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    categoryId: varchar("category_id", { length: 256 }),
    categoryName: varchar("category_name", { length: 256 }).notNull(),
    fullName: varchar("full_name", { length: 256 }).notNull(),
    mnetHostId: varchar("mnet_host_id", { length: 256 })
      .references(() => mnetHosts.id)
      .notNull(),
    idNumber: varchar("id_number", { length: 256 }),
    remoteId: varchar("remote_id", { length: 256 }),
    roleId: varchar("role_id", { length: 256 }),
    roleName: varchar("role_name", { length: 256 }),
    shortName: varchar("short_name", { length: 256 }).notNull(),
    sortOrder: integer("sort_order"),
    startDate: integer("start_date").notNull(),
    summary: text("summary"),
    summaryFormat: integer("summary_format"),
  },
  (mnetServiceEnrolCourses) => {
    return {
      categoryIdIndex: uniqueIndex("category_id_idx").on(
        mnetServiceEnrolCourses.categoryId,
      ),
    };
  },
);

// Schema for mnetServiceEnrolCourses - used to validate API requests
const baseSchema = createSelectSchema(mnetServiceEnrolCourses);

export const insertMnetServiceEnrolCourseSchema = createInsertSchema(
  mnetServiceEnrolCourses,
);
export const insertMnetServiceEnrolCourseParams = baseSchema
  .extend({
    mnetHostId: z.coerce.string().min(1),
    sortOrder: z.coerce.number(),
    startDate: z.coerce.number(),
    summaryFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateMnetServiceEnrolCourseSchema = baseSchema;
export const updateMnetServiceEnrolCourseParams = baseSchema.extend({
  mnetHostId: z.coerce.string().min(1),
  sortOrder: z.coerce.number(),
  startDate: z.coerce.number(),
  summaryFormat: z.coerce.number(),
});
export const mnetServiceEnrolCourseIdSchema = baseSchema.pick({ id: true });

// Types for mnetServiceEnrolCourses - used to type API request params and within Components
export type MnetServiceEnrolCourse =
  typeof mnetServiceEnrolCourses.$inferSelect;
export type NewMnetServiceEnrolCourse = z.infer<
  typeof insertMnetServiceEnrolCourseSchema
>;
export type NewMnetServiceEnrolCourseParams = z.infer<
  typeof insertMnetServiceEnrolCourseParams
>;
export type UpdateMnetServiceEnrolCourseParams = z.infer<
  typeof updateMnetServiceEnrolCourseParams
>;
export type MnetServiceEnrolCourseId = z.infer<
  typeof mnetServiceEnrolCourseIdSchema
>["id"];

