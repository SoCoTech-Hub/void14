import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getRepositoryInstances } from "../api/repositoryInstances/queries";

export const repositoryInstances = pgTable(
  "repository_instances",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    contextId: varchar("context_id", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }),
    readOnly: boolean("read_only").notNull().default(false),
    typeId: varchar("type_id", { length: 256 }).notNull(),
    userName: varchar("user_name", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (repositoryInstances) => {
    return {
      contextIdIndex: uniqueIndex("repository_instances_context_id_idx").on(
        repositoryInstances.contextId,
      ),
    };
  },
);

// Schema for repositoryInstances - used to validate API requests
const baseSchema = createSelectSchema(repositoryInstances).omit(timestamps);

export const insertRepositoryInstanceSchema =
  createInsertSchema(repositoryInstances).omit(timestamps);
export const insertRepositoryInstanceParams = baseSchema
  .extend({
    readOnly: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateRepositoryInstanceSchema = baseSchema;
export const updateRepositoryInstanceParams = baseSchema
  .extend({
    readOnly: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const repositoryInstanceIdSchema = baseSchema.pick({ id: true });

// Types for repositoryInstances - used to type API request params and within Components
export type RepositoryInstance = typeof repositoryInstances.$inferSelect;
export type NewRepositoryInstance = z.infer<
  typeof insertRepositoryInstanceSchema
>;
export type NewRepositoryInstanceParams = z.infer<
  typeof insertRepositoryInstanceParams
>;
export type UpdateRepositoryInstanceParams = z.infer<
  typeof updateRepositoryInstanceParams
>;
export type RepositoryInstanceId = z.infer<
  typeof repositoryInstanceIdSchema
>["id"];

// this type infers the return from getRepositoryInstances() - meaning it will include any joins
export type CompleteRepositoryInstance = Awaited<
  ReturnType<typeof getRepositoryInstances>
>["repositoryInstances"][number];
