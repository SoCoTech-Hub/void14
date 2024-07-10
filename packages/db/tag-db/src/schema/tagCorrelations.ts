import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { tags } from "./tags";

export const tagCorrelations = pgTable("tag_correlations", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  correlatedTags: text("correlated_tags"),
  tagId: varchar("tag_id", { length: 256 })
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for tagCorrelations - used to validate API requests
const baseSchema = createSelectSchema(tagCorrelations);

export const insertTagCorrelationSchema = createInsertSchema(tagCorrelations);
export const insertTagCorrelationParams = baseSchema
  .extend({
    tagId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateTagCorrelationSchema = baseSchema;
export const updateTagCorrelationParams = baseSchema.extend({
  tagId: z.coerce.string().min(1),
});
export const tagCorrelationIdSchema = baseSchema.pick({ id: true });

// Types for tagCorrelations - used to type API request params and within Components
export type TagCorrelation = typeof tagCorrelations.$inferSelect;
export type NewTagCorrelation = z.infer<typeof insertTagCorrelationSchema>;
export type NewTagCorrelationParams = z.infer<
  typeof insertTagCorrelationParams
>;
export type UpdateTagCorrelationParams = z.infer<
  typeof updateTagCorrelationParams
>;
export type TagCorrelationId = z.infer<typeof tagCorrelationIdSchema>["id"];
