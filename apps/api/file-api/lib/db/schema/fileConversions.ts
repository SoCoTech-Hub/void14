import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getFileConversions } from "../../api/fileConversions/queries";

export const fileConversions = pgTable("file_conversions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  converter: varchar("converter", { length: 256 }),
  data: text("data"),
  destFileId: varchar("dest_file_id", { length: 256 }),
  sourceFileId: varchar("source_file_id", { length: 256 }),
  status: boolean("status"),
  statusMessage: text("status_message"),
  targetFormat: varchar("target_format", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for fileConversions - used to validate API requests
const baseSchema = createSelectSchema(fileConversions).omit(timestamps);

export const insertFileConversionSchema =
  createInsertSchema(fileConversions).omit(timestamps);
export const insertFileConversionParams = baseSchema
  .extend({
    status: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateFileConversionSchema = baseSchema;
export const updateFileConversionParams = baseSchema
  .extend({
    status: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const fileConversionIdSchema = baseSchema.pick({ id: true });

// Types for fileConversions - used to type API request params and within Components
export type FileConversion = typeof fileConversions.$inferSelect;
export type NewFileConversion = z.infer<typeof insertFileConversionSchema>;
export type NewFileConversionParams = z.infer<
  typeof insertFileConversionParams
>;
export type UpdateFileConversionParams = z.infer<
  typeof updateFileConversionParams
>;
export type FileConversionId = z.infer<typeof fileConversionIdSchema>["id"];

// this type infers the return from getFileConversions() - meaning it will include any joins
export type CompleteFileConversion = Awaited<
  ReturnType<typeof getFileConversions>
>["fileConversions"][number];
