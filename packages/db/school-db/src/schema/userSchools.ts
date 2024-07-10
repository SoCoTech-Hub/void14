import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { schools } from "./schools";

export const userSchools = pgTable("user_schools", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  schoolId: varchar("school_id", { length: 256 })
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for userSchools - used to validate API requests
const baseSchema = createSelectSchema(userSchools);

export const insertUserSchoolSchema = createInsertSchema(userSchools);
export const insertUserSchoolParams = baseSchema
  .extend({
    schoolId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateUserSchoolSchema = baseSchema;
export const updateUserSchoolParams = baseSchema
  .extend({
    schoolId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const userSchoolIdSchema = baseSchema.pick({ id: true });

// Types for userSchools - used to type API request params and within Components
export type UserSchool = typeof userSchools.$inferSelect;
export type NewUserSchool = z.infer<typeof insertUserSchoolSchema>;
export type NewUserSchoolParams = z.infer<typeof insertUserSchoolParams>;
export type UpdateUserSchoolParams = z.infer<typeof updateUserSchoolParams>;
export type UserSchoolId = z.infer<typeof userSchoolIdSchema>["id"];
