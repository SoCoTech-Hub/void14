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

export const inmails = pgTable("inmails", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  subject: varchar("subject", { length: 256 }).notNull(),
  body: text("body"),
  draft: boolean("draft"),
  reply: boolean("reply"),
  attachment: varchar("attachment", { length: 256 }),
  to: varchar("to", { length: 256 }),
  parentId: varchar("parent_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for inmails - used to validate API requests
const baseSchema = createSelectSchema(inmails).omit(timestamps);

export const insertInmailSchema = createInsertSchema(inmails).omit(timestamps);
export const insertInmailParams = baseSchema
  .extend({
    draft: z.coerce.boolean(),
    reply: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateInmailSchema = baseSchema;
export const updateInmailParams = baseSchema
  .extend({
    draft: z.coerce.boolean(),
    reply: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const inmailIdSchema = baseSchema.pick({ id: true });

// Types for inmails - used to type API request params and within Components
export type Inmail = typeof inmails.$inferSelect;
export type NewInmail = z.infer<typeof insertInmailSchema>;
export type NewInmailParams = z.infer<typeof insertInmailParams>;
export type UpdateInmailParams = z.infer<typeof updateInmailParams>;
export type InmailId = z.infer<typeof inmailIdSchema>["id"];

