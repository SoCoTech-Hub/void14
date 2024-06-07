import { sql } from "drizzle-orm";
import { varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getFavourites } from "@/lib/api/favourites/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const favourites = pgTable('favourites', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  itemId: varchar("item_id", { length: 256 }),
  itemType: varchar("item_type", { length: 256 }),
  ordering: integer("ordering"),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for favourites - used to validate API requests
const baseSchema = createSelectSchema(favourites).omit(timestamps)

export const insertFavouriteSchema = createInsertSchema(favourites).omit(timestamps);
export const insertFavouriteParams = baseSchema.extend({
  ordering: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateFavouriteSchema = baseSchema;
export const updateFavouriteParams = baseSchema.extend({
  ordering: z.coerce.number()
}).omit({ 
  userId: true
});
export const favouriteIdSchema = baseSchema.pick({ id: true });

// Types for favourites - used to type API request params and within Components
export type Favourite = typeof favourites.$inferSelect;
export type NewFavourite = z.infer<typeof insertFavouriteSchema>;
export type NewFavouriteParams = z.infer<typeof insertFavouriteParams>;
export type UpdateFavouriteParams = z.infer<typeof updateFavouriteParams>;
export type FavouriteId = z.infer<typeof favouriteIdSchema>["id"];
    
// this type infers the return from getFavourites() - meaning it will include any joins
export type CompleteFavourite = Awaited<ReturnType<typeof getFavourites>>["favourites"][number];

