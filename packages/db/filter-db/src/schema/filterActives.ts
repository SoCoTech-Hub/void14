import {
  boolean,
  integer,
  pgTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const filterActives = pgTable(
  "filter_actives",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    active: boolean("active"),
    contextId: varchar("context_id", { length: 256 }),
    filter: varchar("filter", { length: 256 }),
    sortOrder: integer("sort_order"),
  },
  (filterActives) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order_idx").on(filterActives.sortOrder),
    };
  },
);

// Schema for filterActives - used to validate API requests
const baseSchema = createSelectSchema(filterActives);

export const insertFilterActiveSchema = createInsertSchema(filterActives);
export const insertFilterActiveParams = baseSchema
  .extend({
    active: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateFilterActiveSchema = baseSchema;
export const updateFilterActiveParams = baseSchema.extend({
  active: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
});
export const filterActiveIdSchema = baseSchema.pick({ id: true });

// Types for filterActives - used to type API request params and within Components
export type FilterActive = typeof filterActives.$inferSelect;
export type NewFilterActive = z.infer<typeof insertFilterActiveSchema>;
export type NewFilterActiveParams = z.infer<typeof insertFilterActiveParams>;
export type UpdateFilterActiveParams = z.infer<typeof updateFilterActiveParams>;
export type FilterActiveId = z.infer<typeof filterActiveIdSchema>["id"];
