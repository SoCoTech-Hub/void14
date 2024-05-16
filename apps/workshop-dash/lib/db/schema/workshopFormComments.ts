import { text, integer, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { workshops } from "./workshops"
import { type getWorkshopFormComments } from "@/lib/api/workshopFormComments/queries";

import { nanoid } from "@/lib/utils";


export const workshopFormComments = pgTable('workshop_form_comments', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  sort: integer("sort"),
  workshopId: varchar("workshop_id", { length: 256 }).references(() => workshops.id, { onDelete: "cascade" }).notNull()
}, (workshopFormComments) => {
  return {
    workshopIdIndex: uniqueIndex('workshop_id_idx').on(workshopFormComments.workshopId),
  }
});


// Schema for workshopFormComments - used to validate API requests
const baseSchema = createSelectSchema(workshopFormComments)

export const insertWorkshopFormCommentSchema = createInsertSchema(workshopFormComments);
export const insertWorkshopFormCommentParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  sort: z.coerce.number(),
  workshopId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateWorkshopFormCommentSchema = baseSchema;
export const updateWorkshopFormCommentParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  sort: z.coerce.number(),
  workshopId: z.coerce.string().min(1)
})
export const workshopFormCommentIdSchema = baseSchema.pick({ id: true });

// Types for workshopFormComments - used to type API request params and within Components
export type WorkshopFormComment = typeof workshopFormComments.$inferSelect;
export type NewWorkshopFormComment = z.infer<typeof insertWorkshopFormCommentSchema>;
export type NewWorkshopFormCommentParams = z.infer<typeof insertWorkshopFormCommentParams>;
export type UpdateWorkshopFormCommentParams = z.infer<typeof updateWorkshopFormCommentParams>;
export type WorkshopFormCommentId = z.infer<typeof workshopFormCommentIdSchema>["id"];
    
// this type infers the return from getWorkshopFormComments() - meaning it will include any joins
export type CompleteWorkshopFormComment = Awaited<ReturnType<typeof getWorkshopFormComments>>["workshopFormComments"][number];

