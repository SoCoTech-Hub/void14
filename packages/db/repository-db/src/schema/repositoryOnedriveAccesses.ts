import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const repositoryOnedriveAccesses = pgTable(
  "repository_onedrive_accesses",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    itemId: varchar("item_id", { length: 256 }).notNull(),
    permissionId: varchar("permission_id", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
);

// Schema for repositoryOnedriveAccesses - used to validate API requests
const baseSchema = createSelectSchema(repositoryOnedriveAccesses).omit(
  timestamps,
);

export const insertRepositoryOnedriveAccessSchema = createInsertSchema(
  repositoryOnedriveAccesses,
).omit(timestamps);
export const insertRepositoryOnedriveAccessParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateRepositoryOnedriveAccessSchema = baseSchema;
export const updateRepositoryOnedriveAccessParams = baseSchema.extend({}).omit({
  userId: true,
});
export const repositoryOnedriveAccessIdSchema = baseSchema.pick({ id: true });

// Types for repositoryOnedriveAccesses - used to type API request params and within Components
export type RepositoryOnedriveAccess =
  typeof repositoryOnedriveAccesses.$inferSelect;
export type NewRepositoryOnedriveAccess = z.infer<
  typeof insertRepositoryOnedriveAccessSchema
>;
export type NewRepositoryOnedriveAccessParams = z.infer<
  typeof insertRepositoryOnedriveAccessParams
>;
export type UpdateRepositoryOnedriveAccessParams = z.infer<
  typeof updateRepositoryOnedriveAccessParams
>;
export type RepositoryOnedriveAccessId = z.infer<
  typeof repositoryOnedriveAccessIdSchema
>["id"];

