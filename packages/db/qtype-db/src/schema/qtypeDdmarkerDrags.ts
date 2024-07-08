import { type getQtypeDdmarkerDrags } from "@/lib/api/qtypeDdmarkerDrags/queries";
import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const qtypeDdmarkerDrags = pgTable(
  "qtype_ddmarker_drags",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    infinite: boolean("infinite").notNull(),
    label: text("label"),
    no: integer("no").notNull(),
    noOfDrags: integer("no_of_drags").notNull(),
    questionId: varchar("question_id", { length: 256 }).notNull(),
  },
  (qtypeDdmarkerDrags) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        qtypeDdmarkerDrags.questionId,
      ),
    };
  },
);

// Schema for qtypeDdmarkerDrags - used to validate API requests
const baseSchema = createSelectSchema(qtypeDdmarkerDrags);

export const insertQtypeDdmarkerDragSchema =
  createInsertSchema(qtypeDdmarkerDrags);
export const insertQtypeDdmarkerDragParams = baseSchema
  .extend({
    infinite: z.coerce.boolean(),
    no: z.coerce.number(),
    noOfDrags: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQtypeDdmarkerDragSchema = baseSchema;
export const updateQtypeDdmarkerDragParams = baseSchema.extend({
  infinite: z.coerce.boolean(),
  no: z.coerce.number(),
  noOfDrags: z.coerce.number(),
});
export const qtypeDdmarkerDragIdSchema = baseSchema.pick({ id: true });

// Types for qtypeDdmarkerDrags - used to type API request params and within Components
export type QtypeDdmarkerDrag = typeof qtypeDdmarkerDrags.$inferSelect;
export type NewQtypeDdmarkerDrag = z.infer<
  typeof insertQtypeDdmarkerDragSchema
>;
export type NewQtypeDdmarkerDragParams = z.infer<
  typeof insertQtypeDdmarkerDragParams
>;
export type UpdateQtypeDdmarkerDragParams = z.infer<
  typeof updateQtypeDdmarkerDragParams
>;
export type QtypeDdmarkerDragId = z.infer<
  typeof qtypeDdmarkerDragIdSchema
>["id"];

// this type infers the return from getQtypeDdmarkerDrags() - meaning it will include any joins
export type CompleteQtypeDdmarkerDrag = Awaited<
  ReturnType<typeof getQtypeDdmarkerDrags>
>["qtypeDdmarkerDrags"][number];
