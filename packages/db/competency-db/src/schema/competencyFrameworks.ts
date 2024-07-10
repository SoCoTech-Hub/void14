import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const competencyFrameworks = pgTable("competency_frameworks", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  visible: boolean("visible"),
  contextId: varchar("context_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: varchar("description_format", { length: 256 }),
  idNumber: varchar("id_number", { length: 256 }),
  scaleConfiguration: text("scale_configuration"),
  scaleId: integer("scale_id"),
  shortname: varchar("shortname", { length: 256 }),
  taxonomies: varchar("taxonomies", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for competencyFrameworks - used to validate API requests
const baseSchema = createSelectSchema(competencyFrameworks).omit(timestamps);

export const insertCompetencyFrameworkSchema =
  createInsertSchema(competencyFrameworks).omit(timestamps);
export const insertCompetencyFrameworkParams = baseSchema
  .extend({
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCompetencyFrameworkSchema = baseSchema;
export const updateCompetencyFrameworkParams = baseSchema
  .extend({
    visible: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const competencyFrameworkIdSchema = baseSchema.pick({ id: true });

// Types for competencyFrameworks - used to type API request params and within Components
export type CompetencyFramework = typeof competencyFrameworks.$inferSelect;
export type NewCompetencyFramework = z.infer<
  typeof insertCompetencyFrameworkSchema
>;
export type NewCompetencyFrameworkParams = z.infer<
  typeof insertCompetencyFrameworkParams
>;
export type UpdateCompetencyFrameworkParams = z.infer<
  typeof updateCompetencyFrameworkParams
>;
export type CompetencyFrameworkId = z.infer<
  typeof competencyFrameworkIdSchema
>["id"];
