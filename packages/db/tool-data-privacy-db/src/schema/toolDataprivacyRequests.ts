import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const toolDataprivacyRequests = pgTable("tool_dataprivacy_requests", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  comments: text("comments"),
  commentsFormat: integer("comments_format"),
  creationMethod: varchar("creation_method", { length: 256 }),
  dpo: varchar("dpo", { length: 256 }),
  dpoComment: text("dpo_comment"),
  dpoCommentFormat: integer("dpo_comment_format"),
  requestedBy: varchar("requested_by", { length: 256 }),
  status: integer("status"),
  systemApproved: boolean("system_approved"),
  type: varchar("type", { length: 256 }),
  userModified: varchar("user_modified", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolDataprivacyRequests - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyRequests).omit(timestamps);

export const insertToolDataprivacyRequestSchema = createInsertSchema(
  toolDataprivacyRequests,
).omit(timestamps);
export const insertToolDataprivacyRequestParams = baseSchema
  .extend({
    commentsFormat: z.coerce.number(),
    dpoCommentFormat: z.coerce.number(),
    status: z.coerce.number(),
    systemApproved: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolDataprivacyRequestSchema = baseSchema;
export const updateToolDataprivacyRequestParams = baseSchema
  .extend({
    commentsFormat: z.coerce.number(),
    dpoCommentFormat: z.coerce.number(),
    status: z.coerce.number(),
    systemApproved: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const toolDataprivacyRequestIdSchema = baseSchema.pick({ id: true });

// Types for toolDataprivacyRequests - used to type API request params and within Components
export type ToolDataprivacyRequest =
  typeof toolDataprivacyRequests.$inferSelect;
export type NewToolDataprivacyRequest = z.infer<
  typeof insertToolDataprivacyRequestSchema
>;
export type NewToolDataprivacyRequestParams = z.infer<
  typeof insertToolDataprivacyRequestParams
>;
export type UpdateToolDataprivacyRequestParams = z.infer<
  typeof updateToolDataprivacyRequestParams
>;
export type ToolDataprivacyRequestId = z.infer<
  typeof toolDataprivacyRequestIdSchema
>["id"];
