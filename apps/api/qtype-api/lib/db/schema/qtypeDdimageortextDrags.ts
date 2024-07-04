import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQtypeDdimageortextDrags } from "../../api/qtypeDdimageortextDrags/queries";

export const qtypeDdimageortextDrags = pgTable(
  "qtype_ddimageortext_drags",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    dragGroup: varchar("drag_group", { length: 256 }),
    infinite: boolean("infinite").notNull(),
    label: text("label"),
    no: integer("no"),
    questionId: varchar("question_id", { length: 256 }).notNull(),
  },
  (qtypeDdimageortextDrags) => {
    return {
      questionIdIndex: uniqueIndex(
        "qtype_ddimageortext_drags_question_id_idx",
      ).on(qtypeDdimageortextDrags.questionId),
    };
  },
);

// Schema for qtypeDdimageortextDrags - used to validate API requests
const baseSchema = createSelectSchema(qtypeDdimageortextDrags);

export const insertQtypeDdimageortextDragSchema = createInsertSchema(
  qtypeDdimageortextDrags,
);
export const insertQtypeDdimageortextDragParams = baseSchema
  .extend({
    infinite: z.coerce.boolean(),
    no: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQtypeDdimageortextDragSchema = baseSchema;
export const updateQtypeDdimageortextDragParams = baseSchema.extend({
  infinite: z.coerce.boolean(),
  no: z.coerce.number(),
});
export const qtypeDdimageortextDragIdSchema = baseSchema.pick({ id: true });

// Types for qtypeDdimageortextDrags - used to type API request params and within Components
export type QtypeDdimageortextDrag =
  typeof qtypeDdimageortextDrags.$inferSelect;
export type NewQtypeDdimageortextDrag = z.infer<
  typeof insertQtypeDdimageortextDragSchema
>;
export type NewQtypeDdimageortextDragParams = z.infer<
  typeof insertQtypeDdimageortextDragParams
>;
export type UpdateQtypeDdimageortextDragParams = z.infer<
  typeof updateQtypeDdimageortextDragParams
>;
export type QtypeDdimageortextDragId = z.infer<
  typeof qtypeDdimageortextDragIdSchema
>["id"];

// this type infers the return from getQtypeDdimageortextDrags() - meaning it will include any joins
export type CompleteQtypeDdimageortextDrag = Awaited<
  ReturnType<typeof getQtypeDdimageortextDrags>
>["qtypeDdimageortextDrags"][number];
