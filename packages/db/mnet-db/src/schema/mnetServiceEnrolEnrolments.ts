import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { mnetHosts } from "./mnetHosts";

export const mnetServiceEnrolEnrolments = pgTable(
  "mnet_service_enrol_enrolments",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    enrolTime: integer("enrol_time"),
    enrolType: varchar("enrol_type", { length: 256 }).notNull(),
    mnetHostId: varchar("mnet_host_id", { length: 256 })
      .references(() => mnetHosts.id)
      .notNull(),
    remoteCourseId: varchar("remote_course_id", { length: 256 }).notNull(),
    roleName: varchar("role_name", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (mnetServiceEnrolEnrolments) => {
    return {
      mnetHostIdIndex: uniqueIndex("mnet_host_id_idx").on(
        mnetServiceEnrolEnrolments.mnetHostId,
      ),
    };
  },
);

// Schema for mnetServiceEnrolEnrolments - used to validate API requests
const baseSchema = createSelectSchema(mnetServiceEnrolEnrolments);

export const insertMnetServiceEnrolEnrolmentSchema = createInsertSchema(
  mnetServiceEnrolEnrolments,
);
export const insertMnetServiceEnrolEnrolmentParams = baseSchema
  .extend({
    enrolTime: z.coerce.number(),
    mnetHostId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMnetServiceEnrolEnrolmentSchema = baseSchema;
export const updateMnetServiceEnrolEnrolmentParams = baseSchema
  .extend({
    enrolTime: z.coerce.number(),
    mnetHostId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const mnetServiceEnrolEnrolmentIdSchema = baseSchema.pick({ id: true });

// Types for mnetServiceEnrolEnrolments - used to type API request params and within Components
export type MnetServiceEnrolEnrolment =
  typeof mnetServiceEnrolEnrolments.$inferSelect;
export type NewMnetServiceEnrolEnrolment = z.infer<
  typeof insertMnetServiceEnrolEnrolmentSchema
>;
export type NewMnetServiceEnrolEnrolmentParams = z.infer<
  typeof insertMnetServiceEnrolEnrolmentParams
>;
export type UpdateMnetServiceEnrolEnrolmentParams = z.infer<
  typeof updateMnetServiceEnrolEnrolmentParams
>;
export type MnetServiceEnrolEnrolmentId = z.infer<
  typeof mnetServiceEnrolEnrolmentIdSchema
>["id"];

