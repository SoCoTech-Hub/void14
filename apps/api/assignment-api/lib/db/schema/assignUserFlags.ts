import { type getAssignUserFlags } from "@/lib/api/assignUserFlags/queries";
import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { assignments } from "./assignments";

export const assignUserFlags = pgTable(
  "assign_user_flags",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    allocatedMarker: varchar("allocated_marker", { length: 256 }),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    extensionDueDate: timestamp("extension_due_date"),
    locked: boolean("locked"),
    isMailed: boolean("is_mailed"),
    workflowState: varchar("workflow_state", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (assignUserFlags) => {
    return {
      assignmentIdIndex: uniqueIndex("auf_assignment_id_idx").on(
        assignUserFlags.assignmentId,
      ),
    };
  },
);

// Schema for assignUserFlags - used to validate API requests
const baseSchema = createSelectSchema(assignUserFlags);

export const insertAssignUserFlagSchema = createInsertSchema(assignUserFlags);
export const insertAssignUserFlagParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    extensionDueDate: z.coerce.string().min(1),
    locked: z.coerce.boolean(),
    isMailed: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAssignUserFlagSchema = baseSchema;
export const updateAssignUserFlagParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
    extensionDueDate: z.coerce.string().min(1),
    locked: z.coerce.boolean(),
    isMailed: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const assignUserFlagIdSchema = baseSchema.pick({ id: true });

// Types for assignUserFlags - used to type API request params and within Components
export type AssignUserFlag = typeof assignUserFlags.$inferSelect;
export type NewAssignUserFlag = z.infer<typeof insertAssignUserFlagSchema>;
export type NewAssignUserFlagParams = z.infer<
  typeof insertAssignUserFlagParams
>;
export type UpdateAssignUserFlagParams = z.infer<
  typeof updateAssignUserFlagParams
>;
export type AssignUserFlagId = z.infer<typeof assignUserFlagIdSchema>["id"];

// this type infers the return from getAssignUserFlags() - meaning it will include any joins
export type CompleteAssignUserFlag = Awaited<
  ReturnType<typeof getAssignUserFlags>
>["assignUserFlags"][number];
