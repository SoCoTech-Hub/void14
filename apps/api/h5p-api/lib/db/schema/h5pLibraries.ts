import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getH5pLibraries } from "../../api/h5pLibraries/queries";

export const h5pLibraries = pgTable("h5p_libraries", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  embedTypes: varchar("embed_types", { length: 256 }),
  addTo: text("add_to"),
  coreMajor: integer("core_major"),
  coreMinor: integer("core_minor"),
  dropLibraryCss: text("drop_library_css"),
  enabled: boolean("enabled"),
  example: text("example"),
  fullScreen: boolean("full_screen"),
  machineName: varchar("machine_name", { length: 256 }),
  majorVersion: integer("major_version"),
  metaDataSettings: text("meta_data_settings"),
  minorVersion: integer("minor_version"),
  patchVersion: integer("patch_version"),
  preLoadedCss: text("pre_loaded_css"),
  preLoadedJs: text("pre_loaded_js"),
  runnable: boolean("runnable"),
  semantics: text("semantics"),
  title: varchar("title", { length: 256 }),
  tutorial: text("tutorial"),
});

// Schema for h5pLibraries - used to validate API requests
const baseSchema = createSelectSchema(h5pLibraries);

export const insertH5pLibrarySchema = createInsertSchema(h5pLibraries);
export const insertH5pLibraryParams = baseSchema
  .extend({
    coreMajor: z.coerce.number(),
    coreMinor: z.coerce.number(),
    enabled: z.coerce.boolean(),
    fullScreen: z.coerce.boolean(),
    majorVersion: z.coerce.number(),
    minorVersion: z.coerce.number(),
    patchVersion: z.coerce.number(),
    runnable: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateH5pLibrarySchema = baseSchema;
export const updateH5pLibraryParams = baseSchema.extend({
  coreMajor: z.coerce.number(),
  coreMinor: z.coerce.number(),
  enabled: z.coerce.boolean(),
  fullScreen: z.coerce.boolean(),
  majorVersion: z.coerce.number(),
  minorVersion: z.coerce.number(),
  patchVersion: z.coerce.number(),
  runnable: z.coerce.boolean(),
});
export const h5pLibraryIdSchema = baseSchema.pick({ id: true });

// Types for h5pLibraries - used to type API request params and within Components
export type H5pLibrary = typeof h5pLibraries.$inferSelect;
export type NewH5pLibrary = z.infer<typeof insertH5pLibrarySchema>;
export type NewH5pLibraryParams = z.infer<typeof insertH5pLibraryParams>;
export type UpdateH5pLibraryParams = z.infer<typeof updateH5pLibraryParams>;
export type H5pLibraryId = z.infer<typeof h5pLibraryIdSchema>["id"];

// this type infers the return from getH5pLibraries() - meaning it will include any joins
export type CompleteH5pLibrary = Awaited<
  ReturnType<typeof getH5pLibraries>
>["h5pLibraries"][number];
