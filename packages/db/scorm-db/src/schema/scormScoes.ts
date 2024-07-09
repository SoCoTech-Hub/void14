import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { scorms } from "./scorms";

export const scormScoes = pgTable("scorm_scoes", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  identifier: varchar("identifier", { length: 256 }),
  launch: text("launch"),
  manifest: varchar("manifest", { length: 256 }),
  organization: varchar("organization", { length: 256 }),
  parent: varchar("parent", { length: 256 }),
  scormId: varchar("scorm_id", { length: 256 })
    .references(() => scorms.id)
    .notNull(),
  scormType: varchar("scorm_type", { length: 256 }),
  sortOrder: integer("sort_order"),
  title: varchar("title", { length: 256 }),
});

// Schema for scormScoes - used to validate API requests
const baseSchema = createSelectSchema(scormScoes);

export const insertScormScoeSchema = createInsertSchema(scormScoes);
export const insertScormScoeParams = baseSchema
  .extend({
    scormId: z.coerce.string().min(1),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateScormScoeSchema = baseSchema;
export const updateScormScoeParams = baseSchema.extend({
  scormId: z.coerce.string().min(1),
  sortOrder: z.coerce.number(),
});
export const scormScoeIdSchema = baseSchema.pick({ id: true });

// Types for scormScoes - used to type API request params and within Components
export type ScormScoe = typeof scormScoes.$inferSelect;
export type NewScormScoe = z.infer<typeof insertScormScoeSchema>;
export type NewScormScoeParams = z.infer<typeof insertScormScoeParams>;
export type UpdateScormScoeParams = z.infer<typeof updateScormScoeParams>;
export type ScormScoeId = z.infer<typeof scormScoeIdSchema>["id"];

