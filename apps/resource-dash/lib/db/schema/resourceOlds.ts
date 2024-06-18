import { sql } from "drizzle-orm";
import { text, varchar, integer, boolean, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getResourceOlds } from "@/lib/api/resourceOlds/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const resourceOlds = pgTable('resource_olds', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  allText: text("all_text"),
  cmId: varchar("cm_id", { length: 256 }),
  courseId: varchar("course_id", { length: 256 }),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  migrated: boolean("migrated"),
  name: varchar("name", { length: 256 }).notNull(),
  newId: varchar("new_id", { length: 256 }),
  newModule: varchar("new_module", { length: 256 }),
  oldId: varchar("old_id", { length: 256 }),
  type: varchar("type", { length: 256 }),
  reference: varchar("reference", { length: 256 }),
  options: varchar("options", { length: 256 }),
  popup: text("popup"),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for resourceOlds - used to validate API requests
const baseSchema = createSelectSchema(resourceOlds).omit(timestamps)

export const insertResourceOldSchema = createInsertSchema(resourceOlds).omit(timestamps);
export const insertResourceOldParams = baseSchema.extend({
  introFormat: z.coerce.number(),
  migrated: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateResourceOldSchema = baseSchema;
export const updateResourceOldParams = baseSchema.extend({
  introFormat: z.coerce.number(),
  migrated: z.coerce.boolean()
})
export const resourceOldIdSchema = baseSchema.pick({ id: true });

// Types for resourceOlds - used to type API request params and within Components
export type ResourceOld = typeof resourceOlds.$inferSelect;
export type NewResourceOld = z.infer<typeof insertResourceOldSchema>;
export type NewResourceOldParams = z.infer<typeof insertResourceOldParams>;
export type UpdateResourceOldParams = z.infer<typeof updateResourceOldParams>;
export type ResourceOldId = z.infer<typeof resourceOldIdSchema>["id"];
    
// this type infers the return from getResourceOlds() - meaning it will include any joins
export type CompleteResourceOld = Awaited<ReturnType<typeof getResourceOlds>>["resourceOlds"][number];

