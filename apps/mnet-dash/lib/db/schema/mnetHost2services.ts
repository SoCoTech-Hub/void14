import { varchar, boolean, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { mnetHosts } from "./mnetHosts"
import { mnetServices } from "./mnetServices"
import { type getMnetHost2services } from "@/lib/api/mnetHost2services/queries";

import { nanoid } from "@/lib/utils";


export const mnetHost2services = pgTable('mnet_host2services', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  mnetHostId: varchar("mnet_host_id", { length: 256 }).references(() => mnetHosts.id, { onDelete: "cascade" }).notNull(),
  mnetServiceId: varchar("mnet_service_id", { length: 256 }).references(() => mnetServices.id, { onDelete: "cascade" }).notNull(),
  publish: boolean("publish"),
  subscribe: boolean("subscribe").notNull()
}, (mnetHost2services) => {
  return {
    mnetHostIdIndex: uniqueIndex('mnet_host_id_idx').on(mnetHost2services.mnetHostId),
  }
});


// Schema for mnetHost2services - used to validate API requests
const baseSchema = createSelectSchema(mnetHost2services)

export const insertMnetHost2serviceSchema = createInsertSchema(mnetHost2services);
export const insertMnetHost2serviceParams = baseSchema.extend({
  mnetHostId: z.coerce.string().min(1),
  mnetServiceId: z.coerce.string().min(1),
  publish: z.coerce.boolean(),
  subscribe: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateMnetHost2serviceSchema = baseSchema;
export const updateMnetHost2serviceParams = baseSchema.extend({
  mnetHostId: z.coerce.string().min(1),
  mnetServiceId: z.coerce.string().min(1),
  publish: z.coerce.boolean(),
  subscribe: z.coerce.boolean()
})
export const mnetHost2serviceIdSchema = baseSchema.pick({ id: true });

// Types for mnetHost2services - used to type API request params and within Components
export type MnetHost2service = typeof mnetHost2services.$inferSelect;
export type NewMnetHost2service = z.infer<typeof insertMnetHost2serviceSchema>;
export type NewMnetHost2serviceParams = z.infer<typeof insertMnetHost2serviceParams>;
export type UpdateMnetHost2serviceParams = z.infer<typeof updateMnetHost2serviceParams>;
export type MnetHost2serviceId = z.infer<typeof mnetHost2serviceIdSchema>["id"];
    
// this type infers the return from getMnetHost2services() - meaning it will include any joins
export type CompleteMnetHost2service = Awaited<ReturnType<typeof getMnetHost2services>>["mnetHost2services"][number];

