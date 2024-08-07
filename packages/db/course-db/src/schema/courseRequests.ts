import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const courseRequests = pgTable("course_requests", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  categoryId: varchar("category_id", { length: 256 }),
  requesterId: varchar("requester_id", { length: 256 }),
  reason: text("reason"),
  summary: text("summary"),
  fullName: varchar("full_name", { length: 256 }),
  password: varchar("password", { length: 256 }),
  shortName: varchar("short_name", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for courseRequests - used to validate API requests
const baseSchema = createSelectSchema(courseRequests).omit(timestamps);

export const insertCourseRequestSchema =
  createInsertSchema(courseRequests).omit(timestamps);
export const insertCourseRequestParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateCourseRequestSchema = baseSchema;
export const updateCourseRequestParams = baseSchema.extend({}).omit({
  userId: true,
});
export const courseRequestIdSchema = baseSchema.pick({ id: true });

// Types for courseRequests - used to type API request params and within Components
export type CourseRequest = typeof courseRequests.$inferSelect;
export type NewCourseRequest = z.infer<typeof insertCourseRequestSchema>;
export type NewCourseRequestParams = z.infer<typeof insertCourseRequestParams>;
export type UpdateCourseRequestParams = z.infer<
  typeof updateCourseRequestParams
>;
export type CourseRequestId = z.infer<typeof courseRequestIdSchema>["id"];
