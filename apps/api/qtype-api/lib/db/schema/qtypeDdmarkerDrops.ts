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

import { type getQtypeDdmarkerDrops } from "../../api/qtypeDdmarkerDrops/queries";

export const qtypeDdmarkerDrops = pgTable(
  "qtype_ddmarker_drops",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    choice: integer("choice"),
    coords: text("coords"),
    no: integer("no"),
    questionId: varchar("question_id", { length: 256 }),
    shape: varchar("shape", { length: 256 }),
  },
  (qtypeDdmarkerDrops) => {
    return {
      questionIdIndex: uniqueIndex("qtype_ddmarker_drops_question_id_idx").on(
        qtypeDdmarkerDrops.questionId,
      ),
    };
  },
);

// Schema for qtypeDdmarkerDrops - used to validate API requests
const baseSchema = createSelectSchema(qtypeDdmarkerDrops);

export const insertQtypeDdmarkerDropSchema =
  createInsertSchema(qtypeDdmarkerDrops);
export const insertQtypeDdmarkerDropParams = baseSchema
  .extend({
    choice: z.coerce.number(),
    no: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQtypeDdmarkerDropSchema = baseSchema;
export const updateQtypeDdmarkerDropParams = baseSchema.extend({
  choice: z.coerce.number(),
  no: z.coerce.number(),
});
export const qtypeDdmarkerDropIdSchema = baseSchema.pick({ id: true });

// Types for qtypeDdmarkerDrops - used to type API request params and within Components
export type QtypeDdmarkerDrop = typeof qtypeDdmarkerDrops.$inferSelect;
export type NewQtypeDdmarkerDrop = z.infer<
  typeof insertQtypeDdmarkerDropSchema
>;
export type NewQtypeDdmarkerDropParams = z.infer<
  typeof insertQtypeDdmarkerDropParams
>;
export type UpdateQtypeDdmarkerDropParams = z.infer<
  typeof updateQtypeDdmarkerDropParams
>;
export type QtypeDdmarkerDropId = z.infer<
  typeof qtypeDdmarkerDropIdSchema
>["id"];

// this type infers the return from getQtypeDdmarkerDrops() - meaning it will include any joins
export type CompleteQtypeDdmarkerDrop = Awaited<
  ReturnType<typeof getQtypeDdmarkerDrops>
>["qtypeDdmarkerDrops"][number];
