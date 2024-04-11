import { sql } from "drizzle-orm";
import { varchar, text, date, timestamp, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { addresses } from "./addresses"
import { genders } from "./genders"
import { nextOfKins } from "./nextOfKins"
import { type getProfiles } from "@/lib/api/profiles/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const profiles = pgTable('profiles', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }),
  fullName: varchar("full_name", { length: 256 }),
  idNumber: varchar("id_number", { length: 256 }),
  mobile: varchar("mobile", { length: 256 }),
  bio: text("bio"),
  dateOfBirth: date("date_of_birth"),
  uniqueId: varchar("unique_id", { length: 256 }),
  addressId: varchar("address_id", { length: 256 }).references(() => addresses.id, { onDelete: "cascade" }).notNull(),
  genderId: varchar("gender_id", { length: 256 }).references(() => genders.id, { onDelete: "cascade" }).notNull(),
  nextOfKinId: varchar("next_of_kin_id", { length: 256 }).references(() => nextOfKins.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (profiles) => {
  return {
    uniqueIdIndex: uniqueIndex('unique_id_idx').on(profiles.uniqueId),
  }
});


// Schema for profiles - used to validate API requests
const baseSchema = createSelectSchema(profiles).omit(timestamps)

export const insertProfileSchema = createInsertSchema(profiles).omit(timestamps);
export const insertProfileParams = baseSchema.extend({
  dateOfBirth: z.coerce.string().min(1),
  addressId: z.coerce.string().min(1),
  genderId: z.coerce.string().min(1),
  nextOfKinId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateProfileSchema = baseSchema;
export const updateProfileParams = baseSchema.extend({
  dateOfBirth: z.coerce.string().min(1),
  addressId: z.coerce.string().min(1),
  genderId: z.coerce.string().min(1),
  nextOfKinId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const profileIdSchema = baseSchema.pick({ id: true });

// Types for profiles - used to type API request params and within Components
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = z.infer<typeof insertProfileSchema>;
export type NewProfileParams = z.infer<typeof insertProfileParams>;
export type UpdateProfileParams = z.infer<typeof updateProfileParams>;
export type ProfileId = z.infer<typeof profileIdSchema>["id"];
    
// this type infers the return from getProfiles() - meaning it will include any joins
export type CompleteProfile = Awaited<ReturnType<typeof getProfiles>>["profiles"][number];

