import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getBursaryCategoriesBursaries } from "../api/bursaryCategoriesBursaries/queries";
import { bursaries } from "./bursaries";
import { bursaryCategories } from "./bursaryCategories";

export const bursaryCategoriesBursaries = pgTable(
  "bursary_categories_bursaries",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    bursaryId: varchar("bursary_id", { length: 256 })
      .references(() => bursaries.id)
      .notNull(),
    bursaryCategoryId: varchar("bursary_category_id", { length: 256 })
      .references(() => bursaryCategories.id)
      .notNull(),
  },
  (bursaryCategoriesBursaries) => {
    return {
      bursaryCategoryIdIndex: uniqueIndex("bursary_category_id_idx").on(
        bursaryCategoriesBursaries.bursaryCategoryId,
      ),
    };
  },
);

// Schema for bursaryCategoriesBursaries - used to validate API requests
const baseSchema = createSelectSchema(bursaryCategoriesBursaries);

export const insertBursaryCategoriesBursarySchema = createInsertSchema(
  bursaryCategoriesBursaries,
);
export const insertBursaryCategoriesBursaryParams = baseSchema
  .extend({
    bursaryId: z.coerce.string().min(1),
    bursaryCategoryId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBursaryCategoriesBursarySchema = baseSchema;
export const updateBursaryCategoriesBursaryParams = baseSchema.extend({
  bursaryId: z.coerce.string().min(1),
  bursaryCategoryId: z.coerce.string().min(1),
});
export const bursaryCategoriesBursaryIdSchema = baseSchema.pick({ id: true });

// Types for bursaryCategoriesBursaries - used to type API request params and within Components
export type BursaryCategoriesBursary =
  typeof bursaryCategoriesBursaries.$inferSelect;
export type NewBursaryCategoriesBursary = z.infer<
  typeof insertBursaryCategoriesBursarySchema
>;
export type NewBursaryCategoriesBursaryParams = z.infer<
  typeof insertBursaryCategoriesBursaryParams
>;
export type UpdateBursaryCategoriesBursaryParams = z.infer<
  typeof updateBursaryCategoriesBursaryParams
>;
export type BursaryCategoriesBursaryId = z.infer<
  typeof bursaryCategoriesBursaryIdSchema
>["id"];

// this type infers the return from getBursaryCategoriesBursaries() - meaning it will include any joins
export type CompleteBursaryCategoriesBursary = Awaited<
  ReturnType<typeof getBursaryCategoriesBursaries>
>["bursaryCategoriesBursaries"][number];
