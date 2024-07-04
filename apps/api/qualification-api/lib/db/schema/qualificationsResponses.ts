import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQualificationsResponses } from "../../api/qualificationsResponses/queries";
import { qualifications } from "./qualifications";

export const qualificationsResponses = pgTable("qualifications_responses", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  isSaved: boolean("is_saved"),
  applied: boolean("applied").notNull(),
  qualificationId: varchar("qualification_id", { length: 256 })
    .references(() => qualifications.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for qualificationsResponses - used to validate API requests
const baseSchema = createSelectSchema(qualificationsResponses);

export const insertQualificationsResponseSchema = createInsertSchema(
  qualificationsResponses,
);
export const insertQualificationsResponseParams = baseSchema
  .extend({
    isSaved: z.coerce.boolean(),
    applied: z.coerce.boolean(),
    qualificationId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateQualificationsResponseSchema = baseSchema;
export const updateQualificationsResponseParams = baseSchema
  .extend({
    isSaved: z.coerce.boolean(),
    applied: z.coerce.boolean(),
    qualificationId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const qualificationsResponseIdSchema = baseSchema.pick({ id: true });

// Types for qualificationsResponses - used to type API request params and within Components
export type QualificationsResponse =
  typeof qualificationsResponses.$inferSelect;
export type NewQualificationsResponse = z.infer<
  typeof insertQualificationsResponseSchema
>;
export type NewQualificationsResponseParams = z.infer<
  typeof insertQualificationsResponseParams
>;
export type UpdateQualificationsResponseParams = z.infer<
  typeof updateQualificationsResponseParams
>;
export type QualificationsResponseId = z.infer<
  typeof qualificationsResponseIdSchema
>["id"];

// this type infers the return from getQualificationsResponses() - meaning it will include any joins
export type CompleteQualificationsResponse = Awaited<
  ReturnType<typeof getQualificationsResponses>
>["qualificationsResponses"][number];
