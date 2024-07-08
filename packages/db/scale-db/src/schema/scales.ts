import { type getScales } from "@/lib/api/scales/queries";
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

export const scales = pgTable("scales", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  name: varchar("name", { length: 256 }),
  scale: text("scale"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for scales - used to validate API requests
const baseSchema = createSelectSchema(scales).omit(timestamps);

export const insertScaleSchema = createInsertSchema(scales).omit(timestamps);
export const insertScaleParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateScaleSchema = baseSchema;
export const updateScaleParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const scaleIdSchema = baseSchema.pick({ id: true });

// Types for scales - used to type API request params and within Components
export type Scale = typeof scales.$inferSelect;
export type NewScale = z.infer<typeof insertScaleSchema>;
export type NewScaleParams = z.infer<typeof insertScaleParams>;
export type UpdateScaleParams = z.infer<typeof updateScaleParams>;
export type ScaleId = z.infer<typeof scaleIdSchema>["id"];

// this type infers the return from getScales() - meaning it will include any joins
export type CompleteScale = Awaited<
  ReturnType<typeof getScales>
>["scales"][number];
