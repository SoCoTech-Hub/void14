import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getGradingformGuideComments } from "../../api/gradingformGuideComments/queries";

export const gradingformGuideComments = pgTable(
  "gradingform_guide_comments",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    definitionId: varchar("definition_id", { length: 256 }),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    sortOrder: integer("sort_order"),
  },
  (gradingformGuideComments) => {
    return {
      sortOrderIndex: uniqueIndex(
        "gradingform_guide_comments_sort_order_idx",
      ).on(gradingformGuideComments.sortOrder),
    };
  },
);

// Schema for gradingformGuideComments - used to validate API requests
const baseSchema = createSelectSchema(gradingformGuideComments);

export const insertGradingformGuideCommentSchema = createInsertSchema(
  gradingformGuideComments,
);
export const insertGradingformGuideCommentParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradingformGuideCommentSchema = baseSchema;
export const updateGradingformGuideCommentParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  sortOrder: z.coerce.number(),
});
export const gradingformGuideCommentIdSchema = baseSchema.pick({ id: true });

// Types for gradingformGuideComments - used to type API request params and within Components
export type GradingformGuideComment =
  typeof gradingformGuideComments.$inferSelect;
export type NewGradingformGuideComment = z.infer<
  typeof insertGradingformGuideCommentSchema
>;
export type NewGradingformGuideCommentParams = z.infer<
  typeof insertGradingformGuideCommentParams
>;
export type UpdateGradingformGuideCommentParams = z.infer<
  typeof updateGradingformGuideCommentParams
>;
export type GradingformGuideCommentId = z.infer<
  typeof gradingformGuideCommentIdSchema
>["id"];

// this type infers the return from getGradingformGuideComments() - meaning it will include any joins
export type CompleteGradingformGuideComment = Awaited<
  ReturnType<typeof getGradingformGuideComments>
>["gradingformGuideComments"][number];
