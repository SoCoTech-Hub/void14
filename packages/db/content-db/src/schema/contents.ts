import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const contents = pgTable("contents", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  visibility: boolean("visibility"),
  configData: text("config_data"),
  contentType: varchar("content_type", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  instanceId: varchar("instance_id", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  userCreated: varchar("user_id", { length: 256 }).notNull(),
  userModified: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for contents - used to validate API requests
const baseSchema = createSelectSchema(contents).omit(timestamps);

export const insertContentSchema =
  createInsertSchema(contents).omit(timestamps);
export const insertContentParams = baseSchema
  .extend({
    visibility: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateContentSchema = baseSchema;
export const updateContentParams = baseSchema
  .extend({
    visibility: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const contentIdSchema = baseSchema.pick({ id: true });

// Types for contents - used to type API request params and within Components
export type Content = typeof contents.$inferSelect;
export type NewContent = z.infer<typeof insertContentSchema>;
export type NewContentParams = z.infer<typeof insertContentParams>;
export type UpdateContentParams = z.infer<typeof updateContentParams>;
export type ContentId = z.infer<typeof contentIdSchema>["id"];

