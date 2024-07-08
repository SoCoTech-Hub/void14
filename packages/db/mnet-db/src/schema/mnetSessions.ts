import { type getMnetSessions } from "@/lib/api/mnetSessions/queries";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { mnetHosts } from "./mnetHosts";

export const mnetSessions = pgTable(
  "mnet_sessions",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    confirmTimeout: integer("confirm_timeout"),
    expires: integer("expires").notNull(),
    mnetHostId: varchar("mnet_host_id", { length: 256 })
      .references(() => mnetHosts.id)
      .notNull(),
    sessionId: varchar("session_id", { length: 256 }),
    token: varchar("token", { length: 256 }).notNull(),
    userAgent: varchar("user_agent", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (mnetSessions) => {
    return {
      mnetHostIdIndex: uniqueIndex("mnet_host_id_idx").on(
        mnetSessions.mnetHostId,
      ),
    };
  },
);

// Schema for mnetSessions - used to validate API requests
const baseSchema = createSelectSchema(mnetSessions);

export const insertMnetSessionSchema = createInsertSchema(mnetSessions);
export const insertMnetSessionParams = baseSchema
  .extend({
    confirmTimeout: z.coerce.number(),
    expires: z.coerce.number(),
    mnetHostId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateMnetSessionSchema = baseSchema;
export const updateMnetSessionParams = baseSchema
  .extend({
    confirmTimeout: z.coerce.number(),
    expires: z.coerce.number(),
    mnetHostId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const mnetSessionIdSchema = baseSchema.pick({ id: true });

// Types for mnetSessions - used to type API request params and within Components
export type MnetSession = typeof mnetSessions.$inferSelect;
export type NewMnetSession = z.infer<typeof insertMnetSessionSchema>;
export type NewMnetSessionParams = z.infer<typeof insertMnetSessionParams>;
export type UpdateMnetSessionParams = z.infer<typeof updateMnetSessionParams>;
export type MnetSessionId = z.infer<typeof mnetSessionIdSchema>["id"];

// this type infers the return from getMnetSessions() - meaning it will include any joins
export type CompleteMnetSession = Awaited<
  ReturnType<typeof getMnetSessions>
>["mnetSessions"][number];
