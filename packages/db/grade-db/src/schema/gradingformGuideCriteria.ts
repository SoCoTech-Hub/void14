import { integer, pgTable, real, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const gradingformGuideCriteria = pgTable(
  "gradingform_guide_criteria",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    definitionId: varchar("definition_id", { length: 256 }),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    descriptionMarkers: text("description_markers"),
    descriptionMarkersFormat: integer("description_markers_format"),
    maxScore: real("max_score"),
    shortName: varchar("short_name", { length: 256 }),
    sortOrder: integer("sort_order"),
  },
  (gradingformGuideCriteria) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order_idx").on(
        gradingformGuideCriteria.sortOrder,
      ),
    };
  },
);

// Schema for gradingformGuideCriteria - used to validate API requests
const baseSchema = createSelectSchema(gradingformGuideCriteria);

export const insertGradingformGuideCriterionSchema = createInsertSchema(
  gradingformGuideCriteria,
);
export const insertGradingformGuideCriterionParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    descriptionMarkersFormat: z.coerce.number(),
    maxScore: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradingformGuideCriterionSchema = baseSchema;
export const updateGradingformGuideCriterionParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  descriptionMarkersFormat: z.coerce.number(),
  maxScore: z.coerce.number(),
  sortOrder: z.coerce.number(),
});
export const gradingformGuideCriterionIdSchema = baseSchema.pick({ id: true });

// Types for gradingformGuideCriteria - used to type API request params and within Components
export type GradingformGuideCriterion =
  typeof gradingformGuideCriteria.$inferSelect;
export type NewGradingformGuideCriterion = z.infer<
  typeof insertGradingformGuideCriterionSchema
>;
export type NewGradingformGuideCriterionParams = z.infer<
  typeof insertGradingformGuideCriterionParams
>;
export type UpdateGradingformGuideCriterionParams = z.infer<
  typeof updateGradingformGuideCriterionParams
>;
export type GradingformGuideCriterionId = z.infer<
  typeof gradingformGuideCriterionIdSchema
>["id"];

