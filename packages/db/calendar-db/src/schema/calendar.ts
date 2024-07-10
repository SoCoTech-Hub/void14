import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const calendar = pgTable("calendar", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  color: varchar("color", { length: 256 }),
  image: varchar("image", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for calendar - used to validate API requests
const baseSchema = createSelectSchema(calendar).omit(timestamps);

export const insertCalendarSchema =
  createInsertSchema(calendar).omit(timestamps);
export const insertCalendarParams = baseSchema
  .extend({
    startDate: z.coerce.string().min(1),
    endDate: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCalendarSchema = baseSchema;
export const updateCalendarParams = baseSchema
  .extend({
    startDate: z.coerce.string().min(1),
    endDate: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const calendarIdSchema = baseSchema.pick({ id: true });

// Types for calendar - used to type API request params and within Components
export type Calendar = typeof calendar.$inferSelect;
export type NewCalendar = z.infer<typeof insertCalendarSchema>;
export type NewCalendarParams = z.infer<typeof insertCalendarParams>;
export type UpdateCalendarParams = z.infer<typeof updateCalendarParams>;
export type CalendarId = z.infer<typeof calendarIdSchema>["id"];
