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

export const folders = pgTable("folders", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  course: varchar("course", { length: 256 }),
  display: integer("display"),
  forcedDownload: boolean("forced_download"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  name: varchar("name", { length: 256 }),
  revision: integer("revision"),
  showDownloadFolder: boolean("show_download_folder"),
  showExpanded: boolean("show_expanded"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for folders - used to validate API requests
const baseSchema = createSelectSchema(folders).omit(timestamps);

export const insertFolderSchema = createInsertSchema(folders).omit(timestamps);
export const insertFolderParams = baseSchema
  .extend({
    display: z.coerce.number(),
    forcedDownload: z.coerce.boolean(),
    introFormat: z.coerce.number(),
    revision: z.coerce.number(),
    showDownloadFolder: z.coerce.boolean(),
    showExpanded: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateFolderSchema = baseSchema;
export const updateFolderParams = baseSchema.extend({
  display: z.coerce.number(),
  forcedDownload: z.coerce.boolean(),
  introFormat: z.coerce.number(),
  revision: z.coerce.number(),
  showDownloadFolder: z.coerce.boolean(),
  showExpanded: z.coerce.boolean(),
});
export const folderIdSchema = baseSchema.pick({ id: true });

// Types for folders - used to type API request params and within Components
export type Folder = typeof folders.$inferSelect;
export type NewFolder = z.infer<typeof insertFolderSchema>;
export type NewFolderParams = z.infer<typeof insertFolderParams>;
export type UpdateFolderParams = z.infer<typeof updateFolderParams>;
export type FolderId = z.infer<typeof folderIdSchema>["id"];
