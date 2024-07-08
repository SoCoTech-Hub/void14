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

export const labels = pgTable("labels", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  course: varchar("course", { length: 256 }),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  name: varchar("name", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for labels - used to validate API requests
const baseSchema = createSelectSchema(labels).omit(timestamps);

export const insertLabelSchema = createInsertSchema(labels).omit(timestamps);
export const insertLabelParams = baseSchema
  .extend({
    introFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateLabelSchema = baseSchema;
export const updateLabelParams = baseSchema.extend({
  introFormat: z.coerce.number(),
});
export const labelIdSchema = baseSchema.pick({ id: true });

// Types for labels - used to type API request params and within Components
export type Label = typeof labels.$inferSelect;
export type NewLabel = z.infer<typeof insertLabelSchema>;
export type NewLabelParams = z.infer<typeof insertLabelParams>;
export type UpdateLabelParams = z.infer<typeof updateLabelParams>;
export type LabelId = z.infer<typeof labelIdSchema>["id"];

