import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { mnetHosts } from "./mnetHosts";

export const mnetSsoAccessControls = pgTable(
  "mnet_sso_access_controls",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    accessCtrl: varchar("access_ctrl", { length: 256 }),
    mnetHostId: varchar("mnet_host_id", { length: 256 })
      .references(() => mnetHosts.id, { onDelete: "cascade" })
      .notNull(),
    username: varchar("username", { length: 256 }),
  },
  (mnetSsoAccessControls) => {
    return {
      mnetHostIdIndex: uniqueIndex("mnet_host_id_idx").on(
        mnetSsoAccessControls.mnetHostId,
      ),
    };
  },
);

// Schema for mnetSsoAccessControls - used to validate API requests
const baseSchema = createSelectSchema(mnetSsoAccessControls);

export const insertMnetSsoAccessControlSchema = createInsertSchema(
  mnetSsoAccessControls,
);
export const insertMnetSsoAccessControlParams = baseSchema
  .extend({
    mnetHostId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateMnetSsoAccessControlSchema = baseSchema;
export const updateMnetSsoAccessControlParams = baseSchema.extend({
  mnetHostId: z.coerce.string().min(1),
});
export const mnetSsoAccessControlIdSchema = baseSchema.pick({ id: true });

// Types for mnetSsoAccessControls - used to type API request params and within Components
export type MnetSsoAccessControl = typeof mnetSsoAccessControls.$inferSelect;
export type NewMnetSsoAccessControl = z.infer<
  typeof insertMnetSsoAccessControlSchema
>;
export type NewMnetSsoAccessControlParams = z.infer<
  typeof insertMnetSsoAccessControlParams
>;
export type UpdateMnetSsoAccessControlParams = z.infer<
  typeof updateMnetSsoAccessControlParams
>;
export type MnetSsoAccessControlId = z.infer<
  typeof mnetSsoAccessControlIdSchema
>["id"];
