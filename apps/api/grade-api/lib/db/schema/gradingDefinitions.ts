import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getGradingDefinitions } from "../api/gradingDefinitions/queries";

export const gradingDefinitions = pgTable("grading_definitions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  areaId: varchar("area_id", { length: 256 }),
  copiedFromId: varchar("copied_from_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  method: varchar("method", { length: 256 }),
  name: varchar("name", { length: 256 }),
  options: text("options"),
  status: integer("status"),
  timeCopied: timestamp("time_copied"),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userModified: varchar("user_modified", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for gradingDefinitions - used to validate API requests
const baseSchema = createSelectSchema(gradingDefinitions).omit(timestamps);

export const insertGradingDefinitionSchema =
  createInsertSchema(gradingDefinitions).omit(timestamps);
export const insertGradingDefinitionParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    status: z.coerce.number(),
    timeCopied: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateGradingDefinitionSchema = baseSchema;
export const updateGradingDefinitionParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    status: z.coerce.number(),
    timeCopied: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const gradingDefinitionIdSchema = baseSchema.pick({ id: true });

// Types for gradingDefinitions - used to type API request params and within Components
export type GradingDefinition = typeof gradingDefinitions.$inferSelect;
export type NewGradingDefinition = z.infer<
  typeof insertGradingDefinitionSchema
>;
export type NewGradingDefinitionParams = z.infer<
  typeof insertGradingDefinitionParams
>;
export type UpdateGradingDefinitionParams = z.infer<
  typeof updateGradingDefinitionParams
>;
export type GradingDefinitionId = z.infer<
  typeof gradingDefinitionIdSchema
>["id"];

// this type infers the return from getGradingDefinitions() - meaning it will include any joins
export type CompleteGradingDefinition = Awaited<
  ReturnType<typeof getGradingDefinitions>
>["gradingDefinitions"][number];
