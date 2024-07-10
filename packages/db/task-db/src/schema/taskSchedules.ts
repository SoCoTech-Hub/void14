import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const taskSchedules = pgTable("task_schedules", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  blocking: boolean("blocking"),
  classname: varchar("classname", { length: 256 }),
  component: varchar("component", { length: 256 }),
  customised: boolean("customised"),
  day: varchar("day", { length: 256 }),
  dayOfWeek: varchar("day_of_week", { length: 256 }),
  disabled: boolean("disabled"),
  failDelay: integer("fail_delay"),
  hostname: varchar("hostname", { length: 256 }),
  hour: varchar("hour", { length: 256 }),
  lastRuntime: timestamp("last_runtime"),
  nextRuntime: timestamp("next_runtime"),
  timeStarted: timestamp("time_started"),
  minute: varchar("minute", { length: 256 }),
  month: varchar("month", { length: 256 }),
  pid: varchar("pid", { length: 256 }),
});

// Schema for taskSchedules - used to validate API requests
const baseSchema = createSelectSchema(taskSchedules);

export const insertTaskScheduleSchema = createInsertSchema(taskSchedules);
export const insertTaskScheduleParams = baseSchema
  .extend({
    blocking: z.coerce.boolean(),
    customised: z.coerce.boolean(),
    disabled: z.coerce.boolean(),
    failDelay: z.coerce.number(),
    lastRuntime: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateTaskScheduleSchema = baseSchema;
export const updateTaskScheduleParams = baseSchema.extend({
  blocking: z.coerce.boolean(),
  customised: z.coerce.boolean(),
  disabled: z.coerce.boolean(),
  failDelay: z.coerce.number(),
  lastRuntime: z.coerce.string().min(1),
});
export const taskScheduleIdSchema = baseSchema.pick({ id: true });

// Types for taskSchedules - used to type API request params and within Components
export type TaskSchedule = typeof taskSchedules.$inferSelect;
export type NewTaskSchedule = z.infer<typeof insertTaskScheduleSchema>;
export type NewTaskScheduleParams = z.infer<typeof insertTaskScheduleParams>;
export type UpdateTaskScheduleParams = z.infer<typeof updateTaskScheduleParams>;
export type TaskScheduleId = z.infer<typeof taskScheduleIdSchema>["id"];
