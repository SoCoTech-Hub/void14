import { type getQtypeDdimageortextDrops } from "@/lib/api/qtypeDdimageortextDrops/queries";
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

export const qtypeDdimageortextDrops = pgTable(
  "qtype_ddimageortext_drops",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    choice: integer("choice"),
    label: text("label"),
    no: integer("no").notNull(),
    questionId: varchar("question_id", { length: 256 }).notNull(),
    xLeft: integer("x_left"),
    yTop: integer("y_top"),
  },
  (qtypeDdimageortextDrops) => {
    return {
      questionIdIndex: uniqueIndex(
        "qtype_ddimageortext_drops_question_id_idx",
      ).on(qtypeDdimageortextDrops.questionId),
    };
  },
);

// Schema for qtypeDdimageortextDrops - used to validate API requests
const baseSchema = createSelectSchema(qtypeDdimageortextDrops);

export const insertQtypeDdimageortextDropSchema = createInsertSchema(
  qtypeDdimageortextDrops,
);
export const insertQtypeDdimageortextDropParams = baseSchema
  .extend({
    choice: z.coerce.number(),
    no: z.coerce.number(),
    xLeft: z.coerce.number(),
    yTop: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQtypeDdimageortextDropSchema = baseSchema;
export const updateQtypeDdimageortextDropParams = baseSchema.extend({
  choice: z.coerce.number(),
  no: z.coerce.number(),
  xLeft: z.coerce.number(),
  yTop: z.coerce.number(),
});
export const qtypeDdimageortextDropIdSchema = baseSchema.pick({ id: true });

// Types for qtypeDdimageortextDrops - used to type API request params and within Components
export type QtypeDdimageortextDrop =
  typeof qtypeDdimageortextDrops.$inferSelect;
export type NewQtypeDdimageortextDrop = z.infer<
  typeof insertQtypeDdimageortextDropSchema
>;
export type NewQtypeDdimageortextDropParams = z.infer<
  typeof insertQtypeDdimageortextDropParams
>;
export type UpdateQtypeDdimageortextDropParams = z.infer<
  typeof updateQtypeDdimageortextDropParams
>;
export type QtypeDdimageortextDropId = z.infer<
  typeof qtypeDdimageortextDropIdSchema
>["id"];

// this type infers the return from getQtypeDdimageortextDrops() - meaning it will include any joins
export type CompleteQtypeDdimageortextDrop = Awaited<
  ReturnType<typeof getQtypeDdimageortextDrops>
>["qtypeDdimageortextDrops"][number];
