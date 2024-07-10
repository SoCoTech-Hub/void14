import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const massMailLists = pgTable("mass_mail_lists", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  isPublic: boolean("is_public"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for massMailLists - used to validate API requests
const baseSchema = createSelectSchema(massMailLists).omit(timestamps);

export const insertMassMailListSchema =
  createInsertSchema(massMailLists).omit(timestamps);
export const insertMassMailListParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMassMailListSchema = baseSchema;
export const updateMassMailListParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const massMailListIdSchema = baseSchema.pick({ id: true });

// Types for massMailLists - used to type API request params and within Components
export type MassMailList = typeof massMailLists.$inferSelect;
export type NewMassMailList = z.infer<typeof insertMassMailListSchema>;
export type NewMassMailListParams = z.infer<typeof insertMassMailListParams>;
export type UpdateMassMailListParams = z.infer<typeof updateMassMailListParams>;
export type MassMailListId = z.infer<typeof massMailListIdSchema>["id"];
