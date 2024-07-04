import { type getCompetencies } from "@/lib/api/competencies/queries";
import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { competencyFrameworks } from "./competencyFrameworks";

export const competencies = pgTable(
  "competencies",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    competencyFrameworkId: varchar("competency_framework_id", { length: 256 })
      .references(() => competencyFrameworks.id, { onDelete: "cascade" })
      .notNull(),
    description: text("description"),
    descriptionFormat: varchar("description_format", { length: 256 }),
    idNumber: varchar("id_number", { length: 256 }),
    parentId: varchar("parent_id", { length: 256 }),
    path: varchar("path", { length: 256 }),
    ruleConfig: text("rule_config"),
    ruleOutcome: varchar("rule_outcome", { length: 256 }),
    ruleType: varchar("rule_type", { length: 256 }),
    scaleConfiguration: text("scale_configuration"),
    scaleId: integer("scale_id"),
    shortname: varchar("shortname", { length: 256 }),
    sortOrder: integer("sort_order").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (competencies) => {
    return {
      sortOrderIndex: uniqueIndex("competencies_sort_order_idx").on(
        competencies.sortOrder,
      ),
    };
  },
);

// Schema for competencies - used to validate API requests
const baseSchema = createSelectSchema(competencies).omit(timestamps);

export const insertCompetencySchema =
  createInsertSchema(competencies).omit(timestamps);
export const insertCompetencyParams = baseSchema
  .extend({
    competencyFrameworkId: z.coerce.string().min(1),
    scaleId: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencySchema = baseSchema;
export const updateCompetencyParams = baseSchema
  .extend({
    competencyFrameworkId: z.coerce.string().min(1),
    scaleId: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const competencyIdSchema = baseSchema.pick({ id: true });

// Types for competencies - used to type API request params and within Components
export type Competency = typeof competencies.$inferSelect;
export type NewCompetency = z.infer<typeof insertCompetencySchema>;
export type NewCompetencyParams = z.infer<typeof insertCompetencyParams>;
export type UpdateCompetencyParams = z.infer<typeof updateCompetencyParams>;
export type CompetencyId = z.infer<typeof competencyIdSchema>["id"];

// this type infers the return from getCompetencies() - meaning it will include any joins
export type CompleteCompetency = Awaited<
  ReturnType<typeof getCompetencies>
>["competencies"][number];
