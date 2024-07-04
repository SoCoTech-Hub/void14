import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getUserPrivateKeys } from "../../api/userPrivateKeys/queries";

export const userPrivateKeys = pgTable("user_private_keys", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  script: varchar("script", { length: 256 }),
  value: varchar("value", { length: 256 }),
  instance: integer("instance"),
  ipRestriction: varchar("ip_restriction", { length: 256 }),
  validUntil: timestamp("valid_until"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for userPrivateKeys - used to validate API requests
const baseSchema = createSelectSchema(userPrivateKeys).omit(timestamps);

export const insertUserPrivateKeySchema =
  createInsertSchema(userPrivateKeys).omit(timestamps);
export const insertUserPrivateKeyParams = baseSchema
  .extend({
    instance: z.coerce.number(),
    validuntil1: z.coerce.number(),
    validUntil: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateUserPrivateKeySchema = baseSchema;
export const updateUserPrivateKeyParams = baseSchema
  .extend({
    instance: z.coerce.number(),
    validuntil1: z.coerce.number(),
    validUntil: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const userPrivateKeyIdSchema = baseSchema.pick({ id: true });

// Types for userPrivateKeys - used to type API request params and within Components
export type UserPrivateKey = typeof userPrivateKeys.$inferSelect;
export type NewUserPrivateKey = z.infer<typeof insertUserPrivateKeySchema>;
export type NewUserPrivateKeyParams = z.infer<
  typeof insertUserPrivateKeyParams
>;
export type UpdateUserPrivateKeyParams = z.infer<
  typeof updateUserPrivateKeyParams
>;
export type UserPrivateKeyId = z.infer<typeof userPrivateKeyIdSchema>["id"];

// this type infers the return from getUserPrivateKeys() - meaning it will include any joins
export type CompleteUserPrivateKey = Awaited<
  ReturnType<typeof getUserPrivateKeys>
>["userPrivateKeys"][number];
