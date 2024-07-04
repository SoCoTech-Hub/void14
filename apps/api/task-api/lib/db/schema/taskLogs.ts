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

import { nanoid, timestamps } from "@soco/utils";

import { type getTaskLogs } from "../../api/taskLogs/queries";

export const taskLogs = pgTable("task_logs", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  classname: varchar("classname", { length: 256 }),
  component: varchar("component", { length: 256 }),
  dbReads: integer("db_reads"),
  dbWrites: integer("db_writes"),
  hostName: varchar("host_name", { length: 256 }),
  output: text("output"),
  pid: varchar("pid", { length: 256 }),
  result: boolean("result"),
  type: integer("type"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for taskLogs - used to validate API requests
const baseSchema = createSelectSchema(taskLogs).omit(timestamps);

export const insertTaskLogSchema =
  createInsertSchema(taskLogs).omit(timestamps);
export const insertTaskLogParams = baseSchema
  .extend({
    dbReads: z.coerce.number(),
    dbWrites: z.coerce.number(),
    result: z.coerce.boolean(),
    type: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateTaskLogSchema = baseSchema;
export const updateTaskLogParams = baseSchema
  .extend({
    dbReads: z.coerce.number(),
    dbWrites: z.coerce.number(),
    result: z.coerce.boolean(),
    type: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const taskLogIdSchema = baseSchema.pick({ id: true });

// Types for taskLogs - used to type API request params and within Components
export type TaskLog = typeof taskLogs.$inferSelect;
export type NewTaskLog = z.infer<typeof insertTaskLogSchema>;
export type NewTaskLogParams = z.infer<typeof insertTaskLogParams>;
export type UpdateTaskLogParams = z.infer<typeof updateTaskLogParams>;
export type TaskLogId = z.infer<typeof taskLogIdSchema>["id"];

// this type infers the return from getTaskLogs() - meaning it will include any joins
export type CompleteTaskLog = Awaited<
  ReturnType<typeof getTaskLogs>
>["taskLogs"][number];
