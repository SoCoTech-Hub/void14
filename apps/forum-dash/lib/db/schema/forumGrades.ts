import { sql } from "drizzle-orm";
import { varchar, real, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getForumGrades } from "@/lib/api/forumGrades/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const forumGrades = pgTable('forum_grades', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  forum: varchar("forum", { length: 256 }),
  grade: real("grade"),
  itemNumber: integer("item_number"),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for forumGrades - used to validate API requests
const baseSchema = createSelectSchema(forumGrades).omit(timestamps)

export const insertForumGradeSchema = createInsertSchema(forumGrades).omit(timestamps);
export const insertForumGradeParams = baseSchema.extend({
  grade: z.coerce.number(),
  itemNumber: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateForumGradeSchema = baseSchema;
export const updateForumGradeParams = baseSchema.extend({
  grade: z.coerce.number(),
  itemNumber: z.coerce.number()
}).omit({ 
  userId: true
});
export const forumGradeIdSchema = baseSchema.pick({ id: true });

// Types for forumGrades - used to type API request params and within Components
export type ForumGrade = typeof forumGrades.$inferSelect;
export type NewForumGrade = z.infer<typeof insertForumGradeSchema>;
export type NewForumGradeParams = z.infer<typeof insertForumGradeParams>;
export type UpdateForumGradeParams = z.infer<typeof updateForumGradeParams>;
export type ForumGradeId = z.infer<typeof forumGradeIdSchema>["id"];
    
// this type infers the return from getForumGrades() - meaning it will include any joins
export type CompleteForumGrade = Awaited<ReturnType<typeof getForumGrades>>["forumGrades"][number];

