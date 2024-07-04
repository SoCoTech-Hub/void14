import { type getScormAiccSessions } from "@/lib/api/scormAiccSessions/queries";
import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { scorms } from "./scorms";
import { scormScoes } from "./scormScoes";

export const scormAiccSessions = pgTable("scorm_aicc_sessions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  attempt: integer("attempt"),
  hacpSession: varchar("hacp_session", { length: 256 }),
  lessonStatus: varchar("lesson_status", { length: 256 }),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
  scormId: varchar("scorm_id", { length: 256 })
    .references(() => scorms.id)
    .notNull(),
  scormMode: varchar("scorm_mode", { length: 256 }),
  scormStatus: varchar("scorm_status", { length: 256 }),
  sessionTime: varchar("session_time", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for scormAiccSessions - used to validate API requests
const baseSchema = createSelectSchema(scormAiccSessions).omit(timestamps);

export const insertScormAiccSessionSchema =
  createInsertSchema(scormAiccSessions).omit(timestamps);
export const insertScormAiccSessionParams = baseSchema
  .extend({
    attempt: z.coerce.number(),
    scormScoeId: z.coerce.string().min(1),
    scormId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateScormAiccSessionSchema = baseSchema;
export const updateScormAiccSessionParams = baseSchema
  .extend({
    attempt: z.coerce.number(),
    scormScoeId: z.coerce.string().min(1),
    scormId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const scormAiccSessionIdSchema = baseSchema.pick({ id: true });

// Types for scormAiccSessions - used to type API request params and within Components
export type ScormAiccSession = typeof scormAiccSessions.$inferSelect;
export type NewScormAiccSession = z.infer<typeof insertScormAiccSessionSchema>;
export type NewScormAiccSessionParams = z.infer<
  typeof insertScormAiccSessionParams
>;
export type UpdateScormAiccSessionParams = z.infer<
  typeof updateScormAiccSessionParams
>;
export type ScormAiccSessionId = z.infer<typeof scormAiccSessionIdSchema>["id"];

// this type infers the return from getScormAiccSessions() - meaning it will include any joins
export type CompleteScormAiccSession = Awaited<
  ReturnType<typeof getScormAiccSessions>
>["scormAiccSessions"][number];
