
import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const favourites = pgTable("favourites", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
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
const baseSchema = createSelectSchema(favourites).omit(timestamps);

export const insertFavouriteSchema =
  createInsertSchema(favourites).omit(timestamps);
export const insertFavouriteParams = baseSchema
  .extend({
    ordering: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateFavouriteSchema = baseSchema;
export const updateFavouriteParams = baseSchema
  .extend({
    ordering: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const favouriteIdSchema = baseSchema.pick({ id: true });

// Types for favourites - used to type API request params and within Components
export type Favourite = typeof favourites.$inferSelect;
export type NewFavourite = z.infer<typeof insertFavouriteSchema>;
export type NewFavouriteParams = z.infer<typeof insertFavouriteParams>;
export type UpdateFavouriteParams = z.infer<typeof updateFavouriteParams>;
export type FavouriteId = z.infer<typeof favouriteIdSchema>["id"];


