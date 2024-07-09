import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { repositoryInstances } from "./repositoryInstances";

export const repositoryInstanceConfigs = pgTable(
  "repository_instance_configs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    repositoryInstanceId: varchar("repository_instance_id", { length: 256 })
      .references(() => repositoryInstances.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    value: text("value"),
  },
  (repositoryInstanceConfigs) => {
    return {
      repositoryInstanceIdIndex: uniqueIndex("repository_instance_id_idx").on(
        repositoryInstanceConfigs.repositoryInstanceId,
      ),
    };
  },
);

// Schema for repositoryInstanceConfigs - used to validate API requests
const baseSchema = createSelectSchema(repositoryInstanceConfigs);

export const insertRepositoryInstanceConfigSchema = createInsertSchema(
  repositoryInstanceConfigs,
);
export const insertRepositoryInstanceConfigParams = baseSchema
  .extend({
    repositoryInstanceId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateRepositoryInstanceConfigSchema = baseSchema;
export const updateRepositoryInstanceConfigParams = baseSchema.extend({
  repositoryInstanceId: z.coerce.string().min(1),
});
export const repositoryInstanceConfigIdSchema = baseSchema.pick({ id: true });

// Types for repositoryInstanceConfigs - used to type API request params and within Components
export type RepositoryInstanceConfig =
  typeof repositoryInstanceConfigs.$inferSelect;
export type NewRepositoryInstanceConfig = z.infer<
  typeof insertRepositoryInstanceConfigSchema
>;
export type NewRepositoryInstanceConfigParams = z.infer<
  typeof insertRepositoryInstanceConfigParams
>;
export type UpdateRepositoryInstanceConfigParams = z.infer<
  typeof updateRepositoryInstanceConfigParams
>;
export type RepositoryInstanceConfigId = z.infer<
  typeof repositoryInstanceConfigIdSchema
>["id"];
