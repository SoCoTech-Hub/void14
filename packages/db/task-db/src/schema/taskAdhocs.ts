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

export const taskAdhocs = pgTable("task_adhocs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  blocking: boolean("blocking"),
  classname: varchar("classname", { length: 256 }),
  component: varchar("component", { length: 256 }),
  customData: text("custom_data"),
  failDelay: varchar("fail_delay", { length: 256 }),
  hostName: varchar("host_name", { length: 256 }),
  nextRuntime: timestamp("next_runtime").notNull(),
  pid: varchar("pid", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for taskAdhocs - used to validate API requests
const baseSchema = createSelectSchema(taskAdhocs).omit(timestamps);

export const insertTaskAdhocSchema =
  createInsertSchema(taskAdhocs).omit(timestamps);
export const insertTaskAdhocParams = baseSchema
  .extend({
    blocking: z.coerce.boolean(),
    nextRuntime: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateTaskAdhocSchema = baseSchema;
export const updateTaskAdhocParams = baseSchema
  .extend({
    blocking: z.coerce.boolean(),
    nextRuntime: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const taskAdhocIdSchema = baseSchema.pick({ id: true });

// Types for taskAdhocs - used to type API request params and within Components
export type TaskAdhoc = typeof taskAdhocs.$inferSelect;
export type NewTaskAdhoc = z.infer<typeof insertTaskAdhocSchema>;
export type NewTaskAdhocParams = z.infer<typeof insertTaskAdhocParams>;
export type UpdateTaskAdhocParams = z.infer<typeof updateTaskAdhocParams>;
export type TaskAdhocId = z.infer<typeof taskAdhocIdSchema>["id"];

