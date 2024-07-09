import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { scorms } from "./scorms";
import { scormScoes } from "./scormScoes";

export const scormScoesTracks = pgTable("scorm_scoes_tracks", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  element: varchar("element", { length: 256 }),
  attempt: integer("attempt"),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
  scormId: varchar("scorm_id", { length: 256 })
    .references(() => scorms.id)
    .notNull(),
  value: text("value"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for scormScoesTracks - used to validate API requests
const baseSchema = createSelectSchema(scormScoesTracks).omit(timestamps);

export const insertScormScoesTrackSchema =
  createInsertSchema(scormScoesTracks).omit(timestamps);
export const insertScormScoesTrackParams = baseSchema
  .extend({
    attempt: z.coerce.number(),
    scormScoeId: z.coerce.string().min(1),
    scormId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateScormScoesTrackSchema = baseSchema;
export const updateScormScoesTrackParams = baseSchema
  .extend({
    attempt: z.coerce.number(),
    scormScoeId: z.coerce.string().min(1),
    scormId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const scormScoesTrackIdSchema = baseSchema.pick({ id: true });

// Types for scormScoesTracks - used to type API request params and within Components
export type ScormScoesTrack = typeof scormScoesTracks.$inferSelect;
export type NewScormScoesTrack = z.infer<typeof insertScormScoesTrackSchema>;
export type NewScormScoesTrackParams = z.infer<
  typeof insertScormScoesTrackParams
>;
export type UpdateScormScoesTrackParams = z.infer<
  typeof updateScormScoesTrackParams
>;
export type ScormScoesTrackId = z.infer<typeof scormScoesTrackIdSchema>["id"];


