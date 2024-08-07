import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const resources = pgTable("resources", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  display: boolean("display"),
  displayOptions: text("display_options"),
  filterFiles: integer("filter_files"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  legacyFiles: integer("legacy_files"),
  legacyFilesLast: integer("legacy_files_last"),
  name: varchar("name", { length: 256 }),
  revision: integer("revision"),
  toBeMigrated: boolean("to_be_migrated"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for resources - used to validate API requests
const baseSchema = createSelectSchema(resources).omit(timestamps);

export const insertResourceSchema =
  createInsertSchema(resources).omit(timestamps);
export const insertResourceParams = baseSchema
  .extend({
    display: z.coerce.boolean(),
    filterFiles: z.coerce.number(),
    introFormat: z.coerce.number(),
    legacyFiles: z.coerce.number(),
    legacyFilesLast: z.coerce.number(),
    revision: z.coerce.number(),
    toBeMigrated: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateResourceSchema = baseSchema;
export const updateResourceParams = baseSchema.extend({
  display: z.coerce.boolean(),
  filterFiles: z.coerce.number(),
  introFormat: z.coerce.number(),
  legacyFiles: z.coerce.number(),
  legacyFilesLast: z.coerce.number(),
  revision: z.coerce.number(),
  toBeMigrated: z.coerce.boolean(),
});
export const resourceIdSchema = baseSchema.pick({ id: true });

// Types for resources - used to type API request params and within Components
export type Resource = typeof resources.$inferSelect;
export type NewResource = z.infer<typeof insertResourceSchema>;
export type NewResourceParams = z.infer<typeof insertResourceParams>;
export type UpdateResourceParams = z.infer<typeof updateResourceParams>;
export type ResourceId = z.infer<typeof resourceIdSchema>["id"];
