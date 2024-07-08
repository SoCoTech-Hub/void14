
import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { assignments } from "./assignments";

export const assignPluginConfigs = pgTable(
  "assign_plugin_configs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    assignmentId: varchar("assignment_id", { length: 256 })
      .references(() => assignments.id)
      .notNull(),
    name: varchar("name", { length: 256 }),
    plugin: varchar("plugin", { length: 256 }),
    subType: varchar("sub_type", { length: 256 }),
    value: text("value"),
  },
  (assignPluginConfigs) => {
    return {
      assignmentIdIndex: uniqueIndex("apc_assignment_id_idx").on(
        assignPluginConfigs.assignmentId,
      ),
    };
  },
);

// Schema for assignPluginConfigs - used to validate API requests
const baseSchema = createSelectSchema(assignPluginConfigs);

export const insertAssignPluginConfigSchema =
  createInsertSchema(assignPluginConfigs);
export const insertAssignPluginConfigParams = baseSchema
  .extend({
    assignmentId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateAssignPluginConfigSchema = baseSchema;
export const updateAssignPluginConfigParams = baseSchema.extend({
  assignmentId: z.coerce.string().min(1),
});
export const assignPluginConfigIdSchema = baseSchema.pick({ id: true });

// Types for assignPluginConfigs - used to type API request params and within Components
export type AssignPluginConfig = typeof assignPluginConfigs.$inferSelect;
export type NewAssignPluginConfig = z.infer<
  typeof insertAssignPluginConfigSchema
>;
export type NewAssignPluginConfigParams = z.infer<
  typeof insertAssignPluginConfigParams
>;
export type UpdateAssignPluginConfigParams = z.infer<
  typeof updateAssignPluginConfigParams
>;
export type AssignPluginConfigId = z.infer<
  typeof assignPluginConfigIdSchema
>["id"];


