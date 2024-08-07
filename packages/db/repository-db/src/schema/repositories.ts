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

export const repositories = pgTable(
  "repositories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    sortOrder: integer("sort_order"),
    type: varchar("type", { length: 256 }).notNull(),
    visible: boolean("visible").notNull().default(true),
  },
  (repositories) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order_idx").on(repositories.sortOrder),
    };
  },
);

// Schema for repositories - used to validate API requests
const baseSchema = createSelectSchema(repositories);

export const insertRepositorySchema = createInsertSchema(repositories);
export const insertRepositoryParams = baseSchema
  .extend({
    sortOrder: z.coerce.number(),
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateRepositorySchema = baseSchema;
export const updateRepositoryParams = baseSchema.extend({
  sortOrder: z.coerce.number(),
  visible: z.coerce.boolean(),
});
export const repositoryIdSchema = baseSchema.pick({ id: true });

// Types for repositories - used to type API request params and within Components
export type Repository = typeof repositories.$inferSelect;
export type NewRepository = z.infer<typeof insertRepositorySchema>;
export type NewRepositoryParams = z.infer<typeof insertRepositoryParams>;
export type UpdateRepositoryParams = z.infer<typeof updateRepositoryParams>;
export type RepositoryId = z.infer<typeof repositoryIdSchema>["id"];
