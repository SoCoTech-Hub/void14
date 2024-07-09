import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { mnetHosts } from "./mnetHosts";

export const mnetLogs = pgTable(
  "mnet_logs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    action: varchar("action", { length: 256 }).notNull(),
    cmId: varchar("cm_id", { length: 256 }),
    courseId: varchar("course_id", { length: 256 }),
    courseName: varchar("course_name", { length: 256 }),
    mnetHostId: varchar("mnet_host_id", { length: 256 })
      .references(() => mnetHosts.id, { onDelete: "cascade" })
      .notNull(),
    info: varchar("info", { length: 256 }),
    ip: varchar("ip", { length: 256 }).notNull(),
    module: varchar("module", { length: 256 }).notNull(),
    remoteId: varchar("remote_id", { length: 256 }),
    time: integer("time"),
    url: varchar("url", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (mnetLogs) => {
    return {
      actionIndex: uniqueIndex("action_idx").on(mnetLogs.action),
    };
  },
);

// Schema for mnetLogs - used to validate API requests
const baseSchema = createSelectSchema(mnetLogs);

export const insertMnetLogSchema = createInsertSchema(mnetLogs);
export const insertMnetLogParams = baseSchema
  .extend({
    mnetHostId: z.coerce.string().min(1),
    time: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMnetLogSchema = baseSchema;
export const updateMnetLogParams = baseSchema
  .extend({
    mnetHostId: z.coerce.string().min(1),
    time: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const mnetLogIdSchema = baseSchema.pick({ id: true });

// Types for mnetLogs - used to type API request params and within Components
export type MnetLog = typeof mnetLogs.$inferSelect;
export type NewMnetLog = z.infer<typeof insertMnetLogSchema>;
export type NewMnetLogParams = z.infer<typeof insertMnetLogParams>;
export type UpdateMnetLogParams = z.infer<typeof updateMnetLogParams>;
export type MnetLogId = z.infer<typeof mnetLogIdSchema>["id"];
