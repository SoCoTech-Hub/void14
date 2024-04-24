import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getZooms } from "@/lib/api/zooms/queries";

import { nanoid } from "@/lib/utils";


export const zooms = pgTable('zooms', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  email: varchar("email", { length: 256 }).notNull(),
  key: varchar("key", { length: 256 }),
  secret: varchar("secret", { length: 256 }),
  sdkKey: varchar("sdk_key", { length: 256 }),
  stsApiKey: varchar("sts_api_key", { length: 256 }),
  stsApiSecret: varchar("sts_api_secret", { length: 256 }),
  stsAccountId: varchar("sts_account_id", { length: 256 })
});


// Schema for zooms - used to validate API requests
const baseSchema = createSelectSchema(zooms)

export const insertZoomSchema = createInsertSchema(zooms);
export const insertZoomParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateZoomSchema = baseSchema;
export const updateZoomParams = baseSchema.extend({})
export const zoomIdSchema = baseSchema.pick({ id: true });

// Types for zooms - used to type API request params and within Components
export type Zoom = typeof zooms.$inferSelect;
export type NewZoom = z.infer<typeof insertZoomSchema>;
export type NewZoomParams = z.infer<typeof insertZoomParams>;
export type UpdateZoomParams = z.infer<typeof updateZoomParams>;
export type ZoomId = z.infer<typeof zoomIdSchema>["id"];
    
// this type infers the return from getZooms() - meaning it will include any joins
export type CompleteZoom = Awaited<ReturnType<typeof getZooms>>["zooms"][number];

