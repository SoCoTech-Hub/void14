import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const externalServices = pgTable("external_services", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  downloadFiles: boolean("download_files"),
  enabled: boolean("enabled"),
  name: varchar("name", { length: 256 }),
  requiredCapability: varchar("required_capability", { length: 256 }),
  shortname: varchar("shortname", { length: 256 }),
  restrictedUsers: boolean("restricted_users"),
  uploadFiles: boolean("upload_files"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for externalServices - used to validate API requests
const baseSchema = createSelectSchema(externalServices).omit(timestamps);

export const insertExternalServiceSchema =
  createInsertSchema(externalServices).omit(timestamps);
export const insertExternalServiceParams = baseSchema
  .extend({
    downloadFiles: z.coerce.boolean(),
    enabled: z.coerce.boolean(),
    restrictedUsers: z.coerce.boolean(),
    uploadFiles: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateExternalServiceSchema = baseSchema;
export const updateExternalServiceParams = baseSchema.extend({
  downloadFiles: z.coerce.boolean(),
  enabled: z.coerce.boolean(),
  restrictedUsers: z.coerce.boolean(),
  uploadFiles: z.coerce.boolean(),
});
export const externalServiceIdSchema = baseSchema.pick({ id: true });

// Types for externalServices - used to type API request params and within Components
export type ExternalService = typeof externalServices.$inferSelect;
export type NewExternalService = z.infer<typeof insertExternalServiceSchema>;
export type NewExternalServiceParams = z.infer<
  typeof insertExternalServiceParams
>;
export type UpdateExternalServiceParams = z.infer<
  typeof updateExternalServiceParams
>;
export type ExternalServiceId = z.infer<typeof externalServiceIdSchema>["id"];
