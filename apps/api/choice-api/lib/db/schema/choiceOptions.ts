import { type getChoiceOptions } from "@/lib/api/choiceOptions/queries";
import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { choices } from "./choices";

export const choiceOptions = pgTable("choice_options", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  maxAnswers: integer("max_answers"),
  text: text("text"),
  choiceId: varchar("choice_id", { length: 256 })
    .references(() => choices.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for choiceOptions - used to validate API requests
const baseSchema = createSelectSchema(choiceOptions).omit(timestamps);

export const insertChoiceOptionSchema =
  createInsertSchema(choiceOptions).omit(timestamps);
export const insertChoiceOptionParams = baseSchema
  .extend({
    maxAnswers: z.coerce.number(),
    choiceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateChoiceOptionSchema = baseSchema;
export const updateChoiceOptionParams = baseSchema.extend({
  maxAnswers: z.coerce.number(),
  choiceId: z.coerce.string().min(1),
});
export const choiceOptionIdSchema = baseSchema.pick({ id: true });

// Types for choiceOptions - used to type API request params and within Components
export type ChoiceOption = typeof choiceOptions.$inferSelect;
export type NewChoiceOption = z.infer<typeof insertChoiceOptionSchema>;
export type NewChoiceOptionParams = z.infer<typeof insertChoiceOptionParams>;
export type UpdateChoiceOptionParams = z.infer<typeof updateChoiceOptionParams>;
export type ChoiceOptionId = z.infer<typeof choiceOptionIdSchema>["id"];

// this type infers the return from getChoiceOptions() - meaning it will include any joins
export type CompleteChoiceOption = Awaited<
  ReturnType<typeof getChoiceOptions>
>["choiceOptions"][number];
