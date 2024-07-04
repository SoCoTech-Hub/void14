import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getMnetHosts } from "../../api/mnetHosts/queries";
import { mnetApplications } from "./mnetApplications";

export const mnetHosts = pgTable(
  "mnet_hosts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    applicationId: varchar("application_id", { length: 256 })
      .references(() => mnetApplications.id, { onDelete: "cascade" })
      .notNull(),
    deleted: boolean("deleted").notNull().default(false),
    forceTheme: boolean("force_theme").notNull().default(false),
    ipAddress: varchar("ip_address", { length: 256 }).notNull(),
    lastConnectTime: integer("last_connect_time"),
    lastLogId: integer("last_log_id"),
    name: varchar("name", { length: 256 }).notNull(),
    portNo: integer("port_no").notNull(),
    publicKey: text("public_key"),
    publicKeyExpires: integer("public_key_expires").notNull(),
    sslVerification: boolean("ssl_verification").notNull().default(false),
    theme: varchar("theme", { length: 256 }),
    transport: integer("transport"),
    wwwroot: varchar("wwwroot", { length: 256 }),
  },
  (mnetHosts) => {
    return {
      applicationIdIndex: uniqueIndex("mnet_hosts_application_id_idx").on(
        mnetHosts.applicationId,
      ),
    };
  },
);

// Schema for mnetHosts - used to validate API requests
const baseSchema = createSelectSchema(mnetHosts);

export const insertMnetHostSchema = createInsertSchema(mnetHosts);
export const insertMnetHostParams = baseSchema
  .extend({
    deleted: z.coerce.boolean(),
    forceTheme: z.coerce.boolean(),
    lastConnectTime: z.coerce.number(),
    applicationId: z.coerce.string().min(1),
    lastLogId: z.coerce.number(),
    portNo: z.coerce.number(),
    publicKeyExpires: z.coerce.number(),
    sslVerification: z.coerce.boolean(),
    transport: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateMnetHostSchema = baseSchema;
export const updateMnetHostParams = baseSchema.extend({
  deleted: z.coerce.boolean(),
  forceTheme: z.coerce.boolean(),
  lastConnectTime: z.coerce.number(),
  applicationId: z.coerce.string().min(1),
  lastLogId: z.coerce.number(),
  portNo: z.coerce.number(),
  publicKeyExpires: z.coerce.number(),
  sslVerification: z.coerce.boolean(),
  transport: z.coerce.number(),
});
export const mnetHostIdSchema = baseSchema.pick({ id: true });

// Types for mnetHosts - used to type API request params and within Components
export type MnetHost = typeof mnetHosts.$inferSelect;
export type NewMnetHost = z.infer<typeof insertMnetHostSchema>;
export type NewMnetHostParams = z.infer<typeof insertMnetHostParams>;
export type UpdateMnetHostParams = z.infer<typeof updateMnetHostParams>;
export type MnetHostId = z.infer<typeof mnetHostIdSchema>["id"];

// this type infers the return from getMnetHosts() - meaning it will include any joins
export type CompleteMnetHost = Awaited<
  ReturnType<typeof getMnetHosts>
>["mnetHosts"][number];
