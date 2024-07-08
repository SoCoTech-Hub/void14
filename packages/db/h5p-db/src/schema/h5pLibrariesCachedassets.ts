import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { h5pLibraries } from "./h5pLibraries";

export const h5pLibrariesCachedassets = pgTable("h5p_libraries_cachedassets", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  hash: varchar("hash", { length: 256 }),
  h5pLibraryId: varchar("h5p_library_id", { length: 256 })
    .references(() => h5pLibraries.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for h5pLibrariesCachedassets - used to validate API requests
const baseSchema = createSelectSchema(h5pLibrariesCachedassets);

export const insertH5pLibrariesCachedassetSchema = createInsertSchema(
  h5pLibrariesCachedassets,
);
export const insertH5pLibrariesCachedassetParams = baseSchema
  .extend({
    h5pLibraryId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateH5pLibrariesCachedassetSchema = baseSchema;
export const updateH5pLibrariesCachedassetParams = baseSchema.extend({
  h5pLibraryId: z.coerce.string().min(1),
});
export const h5pLibrariesCachedassetIdSchema = baseSchema.pick({ id: true });

// Types for h5pLibrariesCachedassets - used to type API request params and within Components
export type H5pLibrariesCachedasset =
  typeof h5pLibrariesCachedassets.$inferSelect;
export type NewH5pLibrariesCachedasset = z.infer<
  typeof insertH5pLibrariesCachedassetSchema
>;
export type NewH5pLibrariesCachedassetParams = z.infer<
  typeof insertH5pLibrariesCachedassetParams
>;
export type UpdateH5pLibrariesCachedassetParams = z.infer<
  typeof updateH5pLibrariesCachedassetParams
>;
export type H5pLibrariesCachedassetId = z.infer<
  typeof h5pLibrariesCachedassetIdSchema
>["id"];


