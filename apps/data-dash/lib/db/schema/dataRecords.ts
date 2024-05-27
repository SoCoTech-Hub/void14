import { sql } from "drizzle-orm";
import { boolean, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { datas } from "./datas"
import { type getDataRecords } from "@/lib/api/dataRecords/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const dataRecords = pgTable('data_records', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  approved: boolean("approved"),
  dataId: varchar("data_id", { length: 256 }).references(() => datas.id, { onDelete: "cascade" }).notNull(),
  groupId: varchar("group_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for dataRecords - used to validate API requests
const baseSchema = createSelectSchema(dataRecords).omit(timestamps)

export const insertDataRecordSchema = createInsertSchema(dataRecords).omit(timestamps);
export const insertDataRecordParams = baseSchema.extend({
  approved: z.coerce.boolean(),
  dataId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateDataRecordSchema = baseSchema;
export const updateDataRecordParams = baseSchema.extend({
  approved: z.coerce.boolean(),
  dataId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const dataRecordIdSchema = baseSchema.pick({ id: true });

// Types for dataRecords - used to type API request params and within Components
export type DataRecord = typeof dataRecords.$inferSelect;
export type NewDataRecord = z.infer<typeof insertDataRecordSchema>;
export type NewDataRecordParams = z.infer<typeof insertDataRecordParams>;
export type UpdateDataRecordParams = z.infer<typeof updateDataRecordParams>;
export type DataRecordId = z.infer<typeof dataRecordIdSchema>["id"];
    
// this type infers the return from getDataRecords() - meaning it will include any joins
export type CompleteDataRecord = Awaited<ReturnType<typeof getDataRecords>>["dataRecords"][number];

