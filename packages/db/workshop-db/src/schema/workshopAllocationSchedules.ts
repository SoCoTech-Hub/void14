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

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { workshops } from "./workshops";

export const workshopAllocationSchedules = pgTable(
  "workshop_allocation_schedules",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    enabled: boolean("enabled"),
    resultLog: text("result_log"),
    resultMessage: text("result_message"),
    resultStatus: integer("result_status"),
    settings: text("settings"),
    submissionend: integer("submissionend"),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (workshopAllocationSchedules) => {
    return {
      workshopIdIndex: uniqueIndex("workshop_id_idx").on(
        workshopAllocationSchedules.workshopId,
      ),
    };
  },
);

// Schema for workshopAllocationSchedules - used to validate API requests
const baseSchema = createSelectSchema(workshopAllocationSchedules).omit(
  timestamps,
);

export const insertWorkshopAllocationScheduleSchema = createInsertSchema(
  workshopAllocationSchedules,
).omit(timestamps);
export const insertWorkshopAllocationScheduleParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    resultStatus: z.coerce.number(),
    submissionend: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateWorkshopAllocationScheduleSchema = baseSchema;
export const updateWorkshopAllocationScheduleParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
  resultStatus: z.coerce.number(),
  submissionend: z.coerce.number(),
  workshopId: z.coerce.string().min(1),
});
export const workshopAllocationScheduleIdSchema = baseSchema.pick({ id: true });

// Types for workshopAllocationSchedules - used to type API request params and within Components
export type WorkshopAllocationSchedule =
  typeof workshopAllocationSchedules.$inferSelect;
export type NewWorkshopAllocationSchedule = z.infer<
  typeof insertWorkshopAllocationScheduleSchema
>;
export type NewWorkshopAllocationScheduleParams = z.infer<
  typeof insertWorkshopAllocationScheduleParams
>;
export type UpdateWorkshopAllocationScheduleParams = z.infer<
  typeof updateWorkshopAllocationScheduleParams
>;
export type WorkshopAllocationScheduleId = z.infer<
  typeof workshopAllocationScheduleIdSchema
>["id"];
