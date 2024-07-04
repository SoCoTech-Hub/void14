import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getBigBlueButtonBnLogs } from "../../api/bigBlueButtonBnLogs/queries";
import { bigBlueButtonBns } from "./bigBlueButtonBns";

export const bigBlueButtonBnLogs = pgTable(
  "big_blue_button_bn_logs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    bigBlueButtonBnId: varchar("big_blue_button_bn_id", { length: 256 })
      .references(() => bigBlueButtonBns.id)
      .notNull(),
    courseId: varchar("course_id", { length: 256 }),
    log: varchar("log", { length: 256 }),
    meetingId: varchar("meeting_id", { length: 256 }),
    meta: text("meta"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (bigBlueButtonBnLogs) => {
    return {
      courseIdIndex: uniqueIndex("bl_course_id_idx").on(
        bigBlueButtonBnLogs.courseId,
      ),
    };
  },
);

// Schema for bigBlueButtonBnLogs - used to validate API requests
const baseSchema = createSelectSchema(bigBlueButtonBnLogs).omit(timestamps);

export const insertBigBlueButtonBnLogSchema =
  createInsertSchema(bigBlueButtonBnLogs).omit(timestamps);
export const insertBigBlueButtonBnLogParams = baseSchema
  .extend({
    bigBlueButtonBnId: z.coerce.string().min(1),
    delete: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBigBlueButtonBnLogSchema = baseSchema;
export const updateBigBlueButtonBnLogParams = baseSchema
  .extend({
    bigBlueButtonBnId: z.coerce.string().min(1),
    delete: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const bigBlueButtonBnLogIdSchema = baseSchema.pick({ id: true });

// Types for bigBlueButtonBnLogs - used to type API request params and within Components
export type BigBlueButtonBnLog = typeof bigBlueButtonBnLogs.$inferSelect;
export type NewBigBlueButtonBnLog = z.infer<
  typeof insertBigBlueButtonBnLogSchema
>;
export type NewBigBlueButtonBnLogParams = z.infer<
  typeof insertBigBlueButtonBnLogParams
>;
export type UpdateBigBlueButtonBnLogParams = z.infer<
  typeof updateBigBlueButtonBnLogParams
>;
export type BigBlueButtonBnLogId = z.infer<
  typeof bigBlueButtonBnLogIdSchema
>["id"];

// this type infers the return from getBigBlueButtonBnLogs() - meaning it will include any joins
export type CompleteBigBlueButtonBnLog = Awaited<
  ReturnType<typeof getBigBlueButtonBnLogs>
>["bigBlueButtonBnLogs"][number];
