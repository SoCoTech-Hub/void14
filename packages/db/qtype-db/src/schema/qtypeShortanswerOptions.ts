import { boolean, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const qtypeShortanswerOptions = pgTable(
  "qtype_shortanswer_options",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    questionId: varchar("question_id", { length: 256 }).notNull(),
    useCase: boolean("use_case").notNull(),
  },
  (qtypeShortanswerOptions) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        qtypeShortanswerOptions.questionId,
      ),
    };
  },
);

// Schema for qtypeShortanswerOptions - used to validate API requests
const baseSchema = createSelectSchema(qtypeShortanswerOptions);

export const insertQtypeShortanswerOptionSchema = createInsertSchema(
  qtypeShortanswerOptions,
);
export const insertQtypeShortanswerOptionParams = baseSchema
  .extend({
    useCase: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQtypeShortanswerOptionSchema = baseSchema;
export const updateQtypeShortanswerOptionParams = baseSchema.extend({
  useCase: z.coerce.boolean(),
});
export const qtypeShortanswerOptionIdSchema = baseSchema.pick({ id: true });

// Types for qtypeShortanswerOptions - used to type API request params and within Components
export type QtypeShortanswerOption =
  typeof qtypeShortanswerOptions.$inferSelect;
export type NewQtypeShortanswerOption = z.infer<
  typeof insertQtypeShortanswerOptionSchema
>;
export type NewQtypeShortanswerOptionParams = z.infer<
  typeof insertQtypeShortanswerOptionParams
>;
export type UpdateQtypeShortanswerOptionParams = z.infer<
  typeof updateQtypeShortanswerOptionParams
>;
export type QtypeShortanswerOptionId = z.infer<
  typeof qtypeShortanswerOptionIdSchema
>["id"];
