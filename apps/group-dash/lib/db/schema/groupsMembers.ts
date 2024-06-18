import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getGroupsMembers } from "@/lib/api/groupsMembers/queries";

import { nanoid } from "@/lib/utils";


export const groupsMembers = pgTable('groups_members', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  groupId: varchar("group_id", { length: 256 }),
  itemId: varchar("item_id", { length: 256 }),
  timeAdded: timestamp("time_added"),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for groupsMembers - used to validate API requests
const baseSchema = createSelectSchema(groupsMembers)

export const insertGroupsMemberSchema = createInsertSchema(groupsMembers);
export const insertGroupsMemberParams = baseSchema.extend({
  timeAdded: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateGroupsMemberSchema = baseSchema;
export const updateGroupsMemberParams = baseSchema.extend({
  timeAdded: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const groupsMemberIdSchema = baseSchema.pick({ id: true });

// Types for groupsMembers - used to type API request params and within Components
export type GroupsMember = typeof groupsMembers.$inferSelect;
export type NewGroupsMember = z.infer<typeof insertGroupsMemberSchema>;
export type NewGroupsMemberParams = z.infer<typeof insertGroupsMemberParams>;
export type UpdateGroupsMemberParams = z.infer<typeof updateGroupsMemberParams>;
export type GroupsMemberId = z.infer<typeof groupsMemberIdSchema>["id"];
    
// this type infers the return from getGroupsMembers() - meaning it will include any joins
export type CompleteGroupsMember = Awaited<ReturnType<typeof getGroupsMembers>>["groupsMembers"][number];

