import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getH5pLibraryDependencies } from "../api/h5pLibraryDependencies/queries";
import { h5pLibraries } from "./h5pLibraries";

export const h5pLibraryDependencies = pgTable("h5p_library_dependencies", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  dependencyType: varchar("dependency_type", { length: 256 }),
  h5pLibraryId: varchar("h5p_library_id", { length: 256 })
    .references(() => h5pLibraries.id, { onDelete: "cascade" })
    .notNull(),
  requiredLibraryId: varchar("required_library_id", { length: 256 }),
});

// Schema for h5pLibraryDependencies - used to validate API requests
const baseSchema = createSelectSchema(h5pLibraryDependencies);

export const insertH5pLibraryDependencySchema = createInsertSchema(
  h5pLibraryDependencies,
);
export const insertH5pLibraryDependencyParams = baseSchema
  .extend({
    h5pLibraryId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateH5pLibraryDependencySchema = baseSchema;
export const updateH5pLibraryDependencyParams = baseSchema.extend({
  h5pLibraryId: z.coerce.string().min(1),
});
export const h5pLibraryDependencyIdSchema = baseSchema.pick({ id: true });

// Types for h5pLibraryDependencies - used to type API request params and within Components
export type H5pLibraryDependency = typeof h5pLibraryDependencies.$inferSelect;
export type NewH5pLibraryDependency = z.infer<
  typeof insertH5pLibraryDependencySchema
>;
export type NewH5pLibraryDependencyParams = z.infer<
  typeof insertH5pLibraryDependencyParams
>;
export type UpdateH5pLibraryDependencyParams = z.infer<
  typeof updateH5pLibraryDependencyParams
>;
export type H5pLibraryDependencyId = z.infer<
  typeof h5pLibraryDependencyIdSchema
>["id"];

// this type infers the return from getH5pLibraryDependencies() - meaning it will include any joins
export type CompleteH5pLibraryDependency = Awaited<
  ReturnType<typeof getH5pLibraryDependencies>
>["h5pLibraryDependencies"][number];
