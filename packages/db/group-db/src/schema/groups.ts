import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const groups = pgTable("groups", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  enrolmentKey: varchar("enrolment_key", { length: 256 }),
  idNumber: varchar("id_number", { length: 256 }),
  name: varchar("name", { length: 256 }),
  picture: varchar("picture", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for groups - used to validate API requests
const baseSchema = createSelectSchema(groups).omit(timestamps);

export const insertGroupSchema = createInsertSchema(groups).omit(timestamps);
export const insertGroupParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGroupSchema = baseSchema;
export const updateGroupParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
});
export const groupIdSchema = baseSchema.pick({ id: true });

// Types for groups - used to type API request params and within Components
export type Group = typeof groups.$inferSelect;
export type NewGroup = z.infer<typeof insertGroupSchema>;
export type NewGroupParams = z.infer<typeof insertGroupParams>;
export type UpdateGroupParams = z.infer<typeof updateGroupParams>;
export type GroupId = z.infer<typeof groupIdSchema>["id"];


