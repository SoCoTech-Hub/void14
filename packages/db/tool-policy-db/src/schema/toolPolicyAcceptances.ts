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

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const toolPolicyAcceptances = pgTable("tool_policy_acceptances", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  lang: varchar("lang", { length: 256 }),
  note: text("note"),
  policyVersionId: varchar("policy_version_id", { length: 256 }),
  status: boolean("status"),
  userModified: varchar("user_modified", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolPolicyAcceptances - used to validate API requests
const baseSchema = createSelectSchema(toolPolicyAcceptances).omit(timestamps);

export const insertToolPolicyAcceptanceSchema = createInsertSchema(
  toolPolicyAcceptances,
).omit(timestamps);
export const insertToolPolicyAcceptanceParams = baseSchema
  .extend({
    status: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateToolPolicyAcceptanceSchema = baseSchema;
export const updateToolPolicyAcceptanceParams = baseSchema
  .extend({
    status: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const toolPolicyAcceptanceIdSchema = baseSchema.pick({ id: true });

// Types for toolPolicyAcceptances - used to type API request params and within Components
export type ToolPolicyAcceptance = typeof toolPolicyAcceptances.$inferSelect;
export type NewToolPolicyAcceptance = z.infer<
  typeof insertToolPolicyAcceptanceSchema
>;
export type NewToolPolicyAcceptanceParams = z.infer<
  typeof insertToolPolicyAcceptanceParams
>;
export type UpdateToolPolicyAcceptanceParams = z.infer<
  typeof updateToolPolicyAcceptanceParams
>;
export type ToolPolicyAcceptanceId = z.infer<
  typeof toolPolicyAcceptanceIdSchema
>["id"];
