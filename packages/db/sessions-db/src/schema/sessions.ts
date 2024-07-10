import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const sessions = pgTable("sessions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  firstIp: varchar("first_ip", { length: 256 }),
  lastIp: varchar("last_ip", { length: 256 }),
  sessData: text("sess_data"),
  sid: varchar("sid", { length: 256 }),
  state: integer("state"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for sessions - used to validate API requests
const baseSchema = createSelectSchema(sessions).omit(timestamps);

export const insertSessionSchema =
  createInsertSchema(sessions).omit(timestamps);
export const insertSessionParams = baseSchema
  .extend({
    state: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSessionSchema = baseSchema;
export const updateSessionParams = baseSchema
  .extend({
    state: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const sessionIdSchema = baseSchema.pick({ id: true });

// Types for sessions - used to type API request params and within Components
export type Session = typeof sessions.$inferSelect;
export type NewSession = z.infer<typeof insertSessionSchema>;
export type NewSessionParams = z.infer<typeof insertSessionParams>;
export type UpdateSessionParams = z.infer<typeof updateSessionParams>;
export type SessionId = z.infer<typeof sessionIdSchema>["id"];
