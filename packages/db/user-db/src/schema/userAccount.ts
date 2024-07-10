import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const userAccounts = pgTable(
  "user_accounts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    address: varchar("address", { length: 256 }),
    alternateName: varchar("alternate_name", { length: 256 }),
    auth: varchar("auth", { length: 256 }),
    autoSubscribe: boolean("auto_subscribe"),
    calendarType: varchar("calendar_type", { length: 256 }),
    city: varchar("city", { length: 256 }),
    confirmed: boolean("confirmed"),
    country: varchar("country", { length: 256 }),
    currentLogin: timestamp("current_login"),
    deleted: boolean("deleted"),
    department: varchar("department", { length: 256 }),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    email: varchar("email", { length: 256 }),
    emailStop: boolean("email_stop"),
    firstAccess: timestamp("first_access"),
    firstName: varchar("first_name", { length: 256 }),
    middleName: varchar("middle_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    firstNamePhonetic: varchar("first_name_phonetic", { length: 256 }),
    lastNamePhonetic: varchar("last_name_phonetic", { length: 256 }),
    idNumber: varchar("id_number", { length: 256 }),
    imageAlt: varchar("image_alt", { length: 256 }),
    institution: varchar("institution", { length: 256 }),
    lang: varchar("lang", { length: 256 }),
    lastAccess: timestamp("last_access"),
    lastIp: varchar("last_ip", { length: 256 }),
    lastLogin: timestamp("last_login"),
    mailDigest: boolean("mail_digest"),
    mailDisplay: integer("mail_display"),
    mailFormat: boolean("mail_format"),
    mnetHostId: timestamp("mnet_host_id"),
    moodleNetProfile: varchar("moodle_net_profile", { length: 256 }),
    password: varchar("password", { length: 256 }),
    phone1: varchar("phone1", { length: 256 }),
    phone2: varchar("phone2", { length: 256 }),
    picture: varchar("picture", { length: 256 }),
    policyAgreed: boolean("policy_agreed"),
    secret: varchar("secret", { length: 256 }),
    suspended: boolean("suspended"),
    theme: varchar("theme", { length: 256 }),
    timeZone: varchar("time_zone", { length: 256 }),
    trackForums: boolean("track_forums"),
    trustBitMask: varchar("trust_bit_mask", { length: 256 }),
    username: varchar("username", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(users.email),
    };
  },
);

// Schema for users - used to validate API requests
const baseSchema = createSelectSchema(userAccounts).omit(timestamps);

export const insertUserAccountSchema =
  createInsertSchema(userAccounts).omit(timestamps);
export const insertUserParams = baseSchema
  .extend({
    autoSubscribe: z.coerce.boolean(),
    confirmed: z.coerce.boolean(),
    currentLogin: z.coerce.string().min(1),
    deleted: z.coerce.boolean(),
    descriptionFormat: z.coerce.number(),
    emailStop: z.coerce.boolean(),
    firstAccess: z.coerce.string().min(1),
    lastAccess: z.coerce.string().min(1),
    lastLogin: z.coerce.string().min(1),
    mailDigest: z.coerce.boolean(),
    mailDisplay: z.coerce.number(),
    mailFormat: z.coerce.boolean(),
    mnetHostId: z.coerce.string().min(1),
    policyAgreed: z.coerce.boolean(),
    suspended: z.coerce.boolean(),
    trackForums: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateUserAccountSchema = baseSchema;
export const updateUserAccountParams = baseSchema.extend({
  autoSubscribe: z.coerce.boolean(),
  confirmed: z.coerce.boolean(),
  currentLogin: z.coerce.string().min(1),
  deleted: z.coerce.boolean(),
  descriptionFormat: z.coerce.number(),
  emailStop: z.coerce.boolean(),
  firstAccess: z.coerce.string().min(1),
  lastAccess: z.coerce.string().min(1),
  lastLogin: z.coerce.string().min(1),
  mailDigest: z.coerce.boolean(),
  mailDisplay: z.coerce.number(),
  mailFormat: z.coerce.boolean(),
  mnetHostId: z.coerce.string().min(1),
  policyAgreed: z.coerce.boolean(),
  suspended: z.coerce.boolean(),
  trackForums: z.coerce.boolean(),
});
export const userIdSchema = baseSchema.pick({ id: true });

// Types for users - used to type API request params and within Components
export type User = typeof userAccounts.$inferSelect;
export type NewUser = z.infer<typeof insertUserAccountSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserAccountParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];
