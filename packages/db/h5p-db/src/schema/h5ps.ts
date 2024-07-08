import { type getH5ps } from "@/lib/api/h5ps/queries";
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

export const h5ps = pgTable("h5ps", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contentHash: varchar("content_hash", { length: 256 }),
  displayOptions: integer("display_options"),
  filtered: text("filtered"),
  jsonContent: text("json_content"),
  mainLibraryId: varchar("main_library_id", { length: 256 }),
  pathNameHash: varchar("path_name_hash", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for h5ps - used to validate API requests
const baseSchema = createSelectSchema(h5ps).omit(timestamps);

export const insertH5pSchema = createInsertSchema(h5ps).omit(timestamps);
export const insertH5pParams = baseSchema
  .extend({
    displayOptions: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateH5pSchema = baseSchema;
export const updateH5pParams = baseSchema.extend({
  displayOptions: z.coerce.number(),
});
export const h5pIdSchema = baseSchema.pick({ id: true });

// Types for h5ps - used to type API request params and within Components
export type H5p = typeof h5ps.$inferSelect;
export type NewH5p = z.infer<typeof insertH5pSchema>;
export type NewH5pParams = z.infer<typeof insertH5pParams>;
export type UpdateH5pParams = z.infer<typeof updateH5pParams>;
export type H5pId = z.infer<typeof h5pIdSchema>["id"];

// this type infers the return from getH5ps() - meaning it will include any joins
export type CompleteH5p = Awaited<ReturnType<typeof getH5ps>>["h5ps"][number];
