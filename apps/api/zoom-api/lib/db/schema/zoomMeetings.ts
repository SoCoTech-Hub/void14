import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getZoomMeetings } from "../../api/zoomMeetings/queries";
import { zooms } from "./zooms";

export const zoomMeetings = pgTable("zoom_meetings", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  meetingLink: varchar("meeting_link", { length: 256 }).notNull(),
  participants: text("participants"),
  zoomId: varchar("zoom_id", { length: 256 })
    .references(() => zooms.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for zoomMeetings - used to validate API requests
const baseSchema = createSelectSchema(zoomMeetings);

export const insertZoomMeetingSchema = createInsertSchema(zoomMeetings);
export const insertZoomMeetingParams = baseSchema
  .extend({
    zoomId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateZoomMeetingSchema = baseSchema;
export const updateZoomMeetingParams = baseSchema
  .extend({
    zoomId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const zoomMeetingIdSchema = baseSchema.pick({ id: true });

// Types for zoomMeetings - used to type API request params and within Components
export type ZoomMeeting = typeof zoomMeetings.$inferSelect;
export type NewZoomMeeting = z.infer<typeof insertZoomMeetingSchema>;
export type NewZoomMeetingParams = z.infer<typeof insertZoomMeetingParams>;
export type UpdateZoomMeetingParams = z.infer<typeof updateZoomMeetingParams>;
export type ZoomMeetingId = z.infer<typeof zoomMeetingIdSchema>["id"];

// this type infers the return from getZoomMeetings() - meaning it will include any joins
export type CompleteZoomMeeting = Awaited<
  ReturnType<typeof getZoomMeetings>
>["zoomMeetings"][number];
