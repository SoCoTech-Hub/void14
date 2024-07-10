import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { groupings } from "./groupings";
import { groups } from "./groups";

export const groupingsGroups = pgTable("groupings_groups", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  groupingId: varchar("grouping_id", { length: 256 })
    .references(() => groupings.id, { onDelete: "cascade" })
    .notNull(),
  groupId: varchar("group_id", { length: 256 })
    .references(() => groups.id, { onDelete: "cascade" })
    .notNull(),
  timeAdded: timestamp("time_added"),
});

// Schema for groupingsGroups - used to validate API requests
const baseSchema = createSelectSchema(groupingsGroups);

export const insertGroupingsGroupSchema = createInsertSchema(groupingsGroups);
export const insertGroupingsGroupParams = baseSchema
  .extend({
    groupingId: z.coerce.string().min(1),
    groupId: z.coerce.string().min(1),
    timeAdded: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateGroupingsGroupSchema = baseSchema;
export const updateGroupingsGroupParams = baseSchema.extend({
  groupingId: z.coerce.string().min(1),
  groupId: z.coerce.string().min(1),
  timeAdded: z.coerce.string().min(1),
});
export const groupingsGroupIdSchema = baseSchema.pick({ id: true });

// Types for groupingsGroups - used to type API request params and within Components
export type GroupingsGroup = typeof groupingsGroups.$inferSelect;
export type NewGroupingsGroup = z.infer<typeof insertGroupingsGroupSchema>;
export type NewGroupingsGroupParams = z.infer<
  typeof insertGroupingsGroupParams
>;
export type UpdateGroupingsGroupParams = z.infer<
  typeof updateGroupingsGroupParams
>;
export type GroupingsGroupId = z.infer<typeof groupingsGroupIdSchema>["id"];
