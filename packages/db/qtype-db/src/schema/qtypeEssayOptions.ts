import { boolean, integer, pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const qtypeEssayOptions = pgTable(
  "qtype_essay_options",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    attachments: integer("attachments"),
    attachmentsRequired: integer("attachments_required").notNull(),
    fileTypesList: text("file_types_list"),
    graderInfo: text("grader_info"),
    graderInfoFormat: integer("grader_info_format"),
    maxBytes: integer("max_bytes"),
    maxWordLimit: integer("max_word_limit"),
    minWordLimit: integer("min_word_limit"),
    questionId: varchar("question_id", { length: 256 }),
    responseFieldLines: integer("response_field_lines"),
    responseFormat: varchar("response_format", { length: 256 }),
    responseRequired: boolean("response_required"),
    responseTemplate: text("response_template"),
    responseTemplateFormat: integer("response_template_format"),
  },
  (qtypeEssayOptions) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        qtypeEssayOptions.questionId,
      ),
    };
  },
);

// Schema for qtypeEssayOptions - used to validate API requests
const baseSchema = createSelectSchema(qtypeEssayOptions);

export const insertQtypeEssayOptionSchema =
  createInsertSchema(qtypeEssayOptions);
export const insertQtypeEssayOptionParams = baseSchema
  .extend({
    attachments: z.coerce.number(),
    attachmentsRequired: z.coerce.number(),
    graderInfoFormat: z.coerce.number(),
    maxBytes: z.coerce.number(),
    maxWordLimit: z.coerce.number(),
    minWordLimit: z.coerce.number(),
    responseFieldLines: z.coerce.number(),
    responseRequired: z.coerce.boolean(),
    responseTemplateFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQtypeEssayOptionSchema = baseSchema;
export const updateQtypeEssayOptionParams = baseSchema.extend({
  attachments: z.coerce.number(),
  attachmentsRequired: z.coerce.number(),
  graderInfoFormat: z.coerce.number(),
  maxBytes: z.coerce.number(),
  maxWordLimit: z.coerce.number(),
  minWordLimit: z.coerce.number(),
  responseFieldLines: z.coerce.number(),
  responseRequired: z.coerce.boolean(),
  responseTemplateFormat: z.coerce.number(),
});
export const qtypeEssayOptionIdSchema = baseSchema.pick({ id: true });

// Types for qtypeEssayOptions - used to type API request params and within Components
export type QtypeEssayOption = typeof qtypeEssayOptions.$inferSelect;
export type NewQtypeEssayOption = z.infer<typeof insertQtypeEssayOptionSchema>;
export type NewQtypeEssayOptionParams = z.infer<
  typeof insertQtypeEssayOptionParams
>;
export type UpdateQtypeEssayOptionParams = z.infer<
  typeof updateQtypeEssayOptionParams
>;
export type QtypeEssayOptionId = z.infer<typeof qtypeEssayOptionIdSchema>["id"];

