import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const h5pContentsLibraries = pgTable("h5p_contents_libraries", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  dependencyType: varchar("dependency_type", { length: 256 }),
  dropCss: boolean("drop_css"),
  h5pId: varchar("h5p_id", { length: 256 }),
  libraryId: varchar("library_id", { length: 256 }),
  weight: integer("weight"),
});

// Schema for h5pContentsLibraries - used to validate API requests
const baseSchema = createSelectSchema(h5pContentsLibraries);

export const insertH5pContentsLibrarySchema =
  createInsertSchema(h5pContentsLibraries);
export const insertH5pContentsLibraryParams = baseSchema
  .extend({
    dropCss: z.coerce.boolean(),
    weight: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateH5pContentsLibrarySchema = baseSchema;
export const updateH5pContentsLibraryParams = baseSchema.extend({
  dropCss: z.coerce.boolean(),
  weight: z.coerce.number(),
});
export const h5pContentsLibraryIdSchema = baseSchema.pick({ id: true });

// Types for h5pContentsLibraries - used to type API request params and within Components
export type H5pContentsLibrary = typeof h5pContentsLibraries.$inferSelect;
export type NewH5pContentsLibrary = z.infer<
  typeof insertH5pContentsLibrarySchema
>;
export type NewH5pContentsLibraryParams = z.infer<
  typeof insertH5pContentsLibraryParams
>;
export type UpdateH5pContentsLibraryParams = z.infer<
  typeof updateH5pContentsLibraryParams
>;
export type H5pContentsLibraryId = z.infer<
  typeof h5pContentsLibraryIdSchema
>["id"];


