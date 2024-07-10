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

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { bigBlueButtonBns } from "./bigBlueButtonBns";

export const bigBlueButtonBnRecordings = pgTable(
  "big_blue_button_bn_recordings",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    bigBlueButtonBnId: varchar("big_blue_button_bn_id", { length: 256 })
      .references(() => bigBlueButtonBns.id)
      .notNull(),
    courseId: varchar("course_id", { length: 256 }),
    groupId: varchar("group_id", { length: 256 }),
    headless: boolean("headless"),
    imported: boolean("imported"),
    importedData: text("imported_data"),
    recordingId: varchar("recording_id", { length: 256 }),
    status: boolean("status"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (bigBlueButtonBnRecordings) => {
    return {
      courseIdIndex: uniqueIndex("br_course_id_idx").on(
        bigBlueButtonBnRecordings.courseId,
      ),
    };
  },
);

// Schema for bigBlueButtonBnRecordings - used to validate API requests
const baseSchema = createSelectSchema(bigBlueButtonBnRecordings).omit(
  timestamps,
);

export const insertBigBlueButtonBnRecordingSchema = createInsertSchema(
  bigBlueButtonBnRecordings,
).omit(timestamps);
export const insertBigBlueButtonBnRecordingParams = baseSchema
  .extend({
    bigBlueButtonBnId: z.coerce.string().min(1),
    headless: z.coerce.boolean(),
    imported: z.coerce.boolean(),
    status: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBigBlueButtonBnRecordingSchema = baseSchema;
export const updateBigBlueButtonBnRecordingParams = baseSchema
  .extend({
    bigBlueButtonBnId: z.coerce.string().min(1),
    headless: z.coerce.boolean(),
    imported: z.coerce.boolean(),
    status: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const bigBlueButtonBnRecordingIdSchema = baseSchema.pick({ id: true });

// Types for bigBlueButtonBnRecordings - used to type API request params and within Components
export type BigBlueButtonBnRecording =
  typeof bigBlueButtonBnRecordings.$inferSelect;
export type NewBigBlueButtonBnRecording = z.infer<
  typeof insertBigBlueButtonBnRecordingSchema
>;
export type NewBigBlueButtonBnRecordingParams = z.infer<
  typeof insertBigBlueButtonBnRecordingParams
>;
export type UpdateBigBlueButtonBnRecordingParams = z.infer<
  typeof updateBigBlueButtonBnRecordingParams
>;
export type BigBlueButtonBnRecordingId = z.infer<
  typeof bigBlueButtonBnRecordingIdSchema
>["id"];
