import { type getFilesReferences } from "@/lib/api/filesReferences/queries";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const filesReferences = pgTable("files_references", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  lastSync: timestamp("last_sync"),
  reference: text("reference"),
  referenceHash: varchar("reference_hash", { length: 256 }),
  repositoryId: varchar("repository_id", { length: 256 }),
});

// Schema for filesReferences - used to validate API requests
const baseSchema = createSelectSchema(filesReferences);

export const insertFilesReferenceSchema = createInsertSchema(filesReferences);
export const insertFilesReferenceParams = baseSchema
  .extend({
    lastSync: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateFilesReferenceSchema = baseSchema;
export const updateFilesReferenceParams = baseSchema.extend({
  lastSync: z.coerce.string().min(1),
});
export const filesReferenceIdSchema = baseSchema.pick({ id: true });

// Types for filesReferences - used to type API request params and within Components
export type FilesReference = typeof filesReferences.$inferSelect;
export type NewFilesReference = z.infer<typeof insertFilesReferenceSchema>;
export type NewFilesReferenceParams = z.infer<
  typeof insertFilesReferenceParams
>;
export type UpdateFilesReferenceParams = z.infer<
  typeof updateFilesReferenceParams
>;
export type FilesReferenceId = z.infer<typeof filesReferenceIdSchema>["id"];

// this type infers the return from getFilesReferences() - meaning it will include any joins
export type CompleteFilesReference = Awaited<
  ReturnType<typeof getFilesReferences>
>["filesReferences"][number];
