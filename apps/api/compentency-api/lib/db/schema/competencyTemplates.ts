import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getCompetencyTemplates } from "../../api/competencyTemplates/queries";

export const competencyTemplates = pgTable("competency_templates", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  visible: boolean("visible"),
  contextId: varchar("context_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: varchar("description_format", { length: 256 }),
  dueDate: date("due_date"),
  shortname: varchar("shortname", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for competencyTemplates - used to validate API requests
const baseSchema = createSelectSchema(competencyTemplates).omit(timestamps);

export const insertCompetencyTemplateSchema =
  createInsertSchema(competencyTemplates).omit(timestamps);
export const insertCompetencyTemplateParams = baseSchema
  .extend({
    visible: z.coerce.boolean(),
    dueDate: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyTemplateSchema = baseSchema;
export const updateCompetencyTemplateParams = baseSchema
  .extend({
    visible: z.coerce.boolean(),
    dueDate: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const competencyTemplateIdSchema = baseSchema.pick({ id: true });

// Types for competencyTemplates - used to type API request params and within Components
export type CompetencyTemplate = typeof competencyTemplates.$inferSelect;
export type NewCompetencyTemplate = z.infer<
  typeof insertCompetencyTemplateSchema
>;
export type NewCompetencyTemplateParams = z.infer<
  typeof insertCompetencyTemplateParams
>;
export type UpdateCompetencyTemplateParams = z.infer<
  typeof updateCompetencyTemplateParams
>;
export type CompetencyTemplateId = z.infer<
  typeof competencyTemplateIdSchema
>["id"];

// this type infers the return from getCompetencyTemplates() - meaning it will include any joins
export type CompleteCompetencyTemplate = Awaited<
  ReturnType<typeof getCompetencyTemplates>
>["competencyTemplates"][number];
