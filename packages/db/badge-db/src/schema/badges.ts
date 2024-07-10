import { sql } from "drizzle-orm";
import {
  boolean,
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

export const badges = pgTable("badges", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  attachment: boolean("attachment"),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  expireDate: integer("expire_date"),
  expirePeriod: integer("expire_period"),
  imageAuthorEmail: varchar("image_author_email", { length: 256 }),
  imageAuthorName: varchar("image_author_name", { length: 256 }),
  imageAuthorUrl: varchar("image_author_url", { length: 256 }),
  imageCaption: text("image_caption"),
  issuerContact: varchar("issuer_contact", { length: 256 }),
  issuerName: varchar("issuer_name", { length: 256 }),
  issuerUrl: varchar("issuer_url", { length: 256 }),
  language: varchar("language", { length: 256 }),
  message: text("message"),
  messageSubject: text("message_subject"),
  name: varchar("name", { length: 256 }),
  nextCron: integer("next_cron"),
  notification: boolean("notification"),
  status: boolean("status"),
  type: boolean("type"),
  version: varchar("version", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for badges - used to validate API requests
const baseSchema = createSelectSchema(badges).omit(timestamps);

export const insertBadgeSchema = createInsertSchema(badges).omit(timestamps);
export const insertBadgeParams = baseSchema
  .extend({
    attachment: z.coerce.boolean(),
    expireDate: z.coerce.number(),
    expirePeriod: z.coerce.number(),
    nextCron: z.coerce.number(),
    notification: z.coerce.boolean(),
    status: z.coerce.boolean(),
    type: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBadgeSchema = baseSchema;
export const updateBadgeParams = baseSchema
  .extend({
    attachment: z.coerce.boolean(),
    expireDate: z.coerce.number(),
    expirePeriod: z.coerce.number(),
    nextCron: z.coerce.number(),
    notification: z.coerce.boolean(),
    status: z.coerce.boolean(),
    type: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const badgeIdSchema = baseSchema.pick({ id: true });

// Types for badges - used to type API request params and within Components
export type Badge = typeof badges.$inferSelect;
export type NewBadge = z.infer<typeof insertBadgeSchema>;
export type NewBadgeParams = z.infer<typeof insertBadgeParams>;
export type UpdateBadgeParams = z.infer<typeof updateBadgeParams>;
export type BadgeId = z.infer<typeof badgeIdSchema>["id"];
