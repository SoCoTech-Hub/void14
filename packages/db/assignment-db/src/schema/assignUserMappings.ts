import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { assignments } from "./assignments";

export const assignUserMappings = pgTable(
  "assign_user_mappings",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (assignUserMappings) => {
    return {
      assignmentIdIndex: uniqueIndex("aum_assignment_id_idx").on(
        assignUserMappings.assignmentId,
      ),
    };
  },
);

// Schema for assignUserMappings - used to validate API requests
const baseSchema = createSelectSchema(assignUserMappings);

export const insertAssignUserMappingSchema =
  createInsertSchema(assignUserMappings);
export const insertAssignUserMappingParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAssignUserMappingSchema = baseSchema;
export const updateAssignUserMappingParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const assignUserMappingIdSchema = baseSchema.pick({ id: true });

// Types for assignUserMappings - used to type API request params and within Components
export type AssignUserMapping = typeof assignUserMappings.$inferSelect;
export type NewAssignUserMapping = z.infer<
  typeof insertAssignUserMappingSchema
>;
export type NewAssignUserMappingParams = z.infer<
  typeof insertAssignUserMappingParams
>;
export type UpdateAssignUserMappingParams = z.infer<
  typeof updateAssignUserMappingParams
>;
export type AssignUserMappingId = z.infer<
  typeof assignUserMappingIdSchema
>["id"];
