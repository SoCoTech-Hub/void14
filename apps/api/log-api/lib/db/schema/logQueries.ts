import {
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getLogQueries } from "../api/logQueries/queries";

export const logQueries = pgTable("log_queries", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  backTrace: text("back_trace"),
  error: integer("error"),
  execTime: real("exec_time"),
  info: text("info"),
  qType: integer("q_type"),
  sqlParams: text("sql_params"),
  sqlText: text("sql_text"),
  timeLogged: timestamp("time_logged"),
});

// Schema for logQueries - used to validate API requests
const baseSchema = createSelectSchema(logQueries);

export const insertLogQuerySchema = createInsertSchema(logQueries);
export const insertLogQueryParams = baseSchema
  .extend({
    error: z.coerce.number(),
    execTime: z.coerce.number(),
    qType: z.coerce.number(),
    timeLogged: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateLogQuerySchema = baseSchema;
export const updateLogQueryParams = baseSchema.extend({
  error: z.coerce.number(),
  execTime: z.coerce.number(),
  qType: z.coerce.number(),
  timeLogged: z.coerce.string().min(1),
});
export const logQueryIdSchema = baseSchema.pick({ id: true });

// Types for logQueries - used to type API request params and within Components
export type LogQuery = typeof logQueries.$inferSelect;
export type NewLogQuery = z.infer<typeof insertLogQuerySchema>;
export type NewLogQueryParams = z.infer<typeof insertLogQueryParams>;
export type UpdateLogQueryParams = z.infer<typeof updateLogQueryParams>;
export type LogQueryId = z.infer<typeof logQueryIdSchema>["id"];

// this type infers the return from getLogQueries() - meaning it will include any joins
export type CompleteLogQuery = Awaited<
  ReturnType<typeof getLogQueries>
>["logQueries"][number];
