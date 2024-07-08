import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const enrols = pgTable(
  "enrols",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    cost: varchar("cost", { length: 256 }),
    courseId: varchar("course_id", { length: 256 }),
    currency: varchar("currency", { length: 256 }),
    customChar1: varchar("custom_char1", { length: 256 }),
    customChar2: varchar("custom_char2", { length: 256 }),
    customChar3: varchar("custom_char3", { length: 256 }),
    customDec1: real("custom_dec1"),
    customDec2: real("custom_dec2"),
    customInt1: integer("custom_int1"),
    customInt2: integer("custom_int2"),
    customInt3: integer("custom_int3"),
    customInt4: integer("custom_int4"),
    customInt5: integer("custom_int5"),
    customInt6: integer("custom_int6"),
    customInt7: integer("custom_int7"),
    customInt8: integer("custom_int8"),
    customText1: text("custom_text1"),
    customText2: text("custom_text2"),
    customText3: text("custom_text3"),
    customText4: text("custom_text4"),
    enrol: varchar("enrol", { length: 256 }),
    enrolEndDate: date("enrol_end_date"),
    enrolStartDate: date("enrol_start_date"),
    enrolPeriod: integer("enrol_period"),
    expiryNotify: boolean("expiry_notify"),
    expiryThreshold: integer("expiry_threshold"),
    name: varchar("name", { length: 256 }),
    notifyAll: boolean("notify_all"),
    password: varchar("password", { length: 256 }),
    roleId: varchar("role_id", { length: 256 }),
    sortOrder: integer("sort_order"),
    status: integer("status"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (enrols) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order_idx").on(enrols.sortOrder),
    };
  },
);

// Schema for enrols - used to validate API requests
const baseSchema = createSelectSchema(enrols).omit(timestamps);

export const insertEnrolSchema = createInsertSchema(enrols).omit(timestamps);
export const insertEnrolParams = baseSchema
  .extend({
    customDec1: z.coerce.number(),
    customDec2: z.coerce.number(),
    customInt1: z.coerce.number(),
    customInt2: z.coerce.number(),
    customInt3: z.coerce.number(),
    customInt4: z.coerce.number(),
    customInt5: z.coerce.number(),
    customInt6: z.coerce.number(),
    customInt7: z.coerce.number(),
    customInt8: z.coerce.number(),
    enrolEndDate: z.coerce.string().min(1),
    enrolStartDate: z.coerce.string().min(1),
    enrolPeriod: z.coerce.number(),
    expiryNotify: z.coerce.boolean(),
    expiryThreshold: z.coerce.number(),
    notifyAll: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
    status: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateEnrolSchema = baseSchema;
export const updateEnrolParams = baseSchema.extend({
  customDec1: z.coerce.number(),
  customDec2: z.coerce.number(),
  customInt1: z.coerce.number(),
  customInt2: z.coerce.number(),
  customInt3: z.coerce.number(),
  customInt4: z.coerce.number(),
  customInt5: z.coerce.number(),
  customInt6: z.coerce.number(),
  customInt7: z.coerce.number(),
  customInt8: z.coerce.number(),
  enrolEndDate: z.coerce.string().min(1),
  enrolStartDate: z.coerce.string().min(1),
  enrolPeriod: z.coerce.number(),
  expiryNotify: z.coerce.boolean(),
  expiryThreshold: z.coerce.number(),
  notifyAll: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
  status: z.coerce.number(),
});
export const enrolIdSchema = baseSchema.pick({ id: true });

// Types for enrols - used to type API request params and within Components
export type Enrol = typeof enrols.$inferSelect;
export type NewEnrol = z.infer<typeof insertEnrolSchema>;
export type NewEnrolParams = z.infer<typeof insertEnrolParams>;
export type UpdateEnrolParams = z.infer<typeof updateEnrolParams>;
export type EnrolId = z.infer<typeof enrolIdSchema>["id"];


