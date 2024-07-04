import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getChoices } from "../api/choices/queries";

export const choices = pgTable("choices", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  allowMultiple: varchar("allow_multiple", { length: 256 }),
  allowUpdate: varchar("allow_update", { length: 256 }),
  completionSubmit: boolean("completion_submit"),
  course: varchar("course", { length: 256 }),
  display: varchar("display", { length: 256 }),
  includeInactive: varchar("include_inactive", { length: 256 }),
  intro: text("intro"),
  introFormat: varchar("intro_format", { length: 256 }),
  limitAnswers: varchar("limit_answers", { length: 256 }),
  name: varchar("name", { length: 256 }),
  publish: varchar("publish", { length: 256 }),
  showAvailable: boolean("show_available"),
  showPreview: varchar("show_preview", { length: 256 }),
  showResults: varchar("show_results", { length: 256 }),
  showUnanswered: varchar("show_unanswered", { length: 256 }),
  timeClose: timestamp("time_close"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for choices - used to validate API requests
const baseSchema = createSelectSchema(choices).omit(timestamps);

export const insertChoiceSchema = createInsertSchema(choices).omit(timestamps);
export const insertChoiceParams = baseSchema
  .extend({
    completionSubmit: z.coerce.boolean(),
    showAvailable: z.coerce.boolean(),
    timeClose: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateChoiceSchema = baseSchema;
export const updateChoiceParams = baseSchema.extend({
  completionSubmit: z.coerce.boolean(),
  showAvailable: z.coerce.boolean(),
  timeClose: z.coerce.string().min(1),
});
export const choiceIdSchema = baseSchema.pick({ id: true });

// Types for choices - used to type API request params and within Components
export type Choice = typeof choices.$inferSelect;
export type NewChoice = z.infer<typeof insertChoiceSchema>;
export type NewChoiceParams = z.infer<typeof insertChoiceParams>;
export type UpdateChoiceParams = z.infer<typeof updateChoiceParams>;
export type ChoiceId = z.infer<typeof choiceIdSchema>["id"];

// this type infers the return from getChoices() - meaning it will include any joins
export type CompleteChoice = Awaited<
  ReturnType<typeof getChoices>
>["choices"][number];
