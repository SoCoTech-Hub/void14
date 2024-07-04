import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getBackupLogs } from "../../api/backupLogs/queries";

export const backupLogs = pgTable(
  "backup_logs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    backupId: varchar("backup_id", { length: 256 }),
    logLevel: integer("log_level"),
    message: text("message"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (backupLogs) => {
    return {
      backupIdIndex: uniqueIndex("bl_backup_id_idx").on(backupLogs.backupId),
    };
  },
);

// Schema for backupLogs - used to validate API requests
const baseSchema = createSelectSchema(backupLogs).omit(timestamps);

export const insertBackupLogSchema =
  createInsertSchema(backupLogs).omit(timestamps);
export const insertBackupLogParams = baseSchema
  .extend({
    logLevel: z.coerce.number(),
    delete: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateBackupLogSchema = baseSchema;
export const updateBackupLogParams = baseSchema.extend({
  logLevel: z.coerce.number(),
  delete: z.coerce.boolean(),
});
export const backupLogIdSchema = baseSchema.pick({ id: true });

// Types for backupLogs - used to type API request params and within Components
export type BackupLog = typeof backupLogs.$inferSelect;
export type NewBackupLog = z.infer<typeof insertBackupLogSchema>;
export type NewBackupLogParams = z.infer<typeof insertBackupLogParams>;
export type UpdateBackupLogParams = z.infer<typeof updateBackupLogParams>;
export type BackupLogId = z.infer<typeof backupLogIdSchema>["id"];

// this type infers the return from getBackupLogs() - meaning it will include any joins
export type CompleteBackupLog = Awaited<
  ReturnType<typeof getBackupLogs>
>["backupLogs"][number];
