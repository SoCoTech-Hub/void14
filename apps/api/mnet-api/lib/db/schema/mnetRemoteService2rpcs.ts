import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getMnetRemoteService2rpcs } from "../../api/mnetRemoteService2rpcs/queries";

export const mnetRemoteService2rpcs = pgTable(
  "mnet_remote_service2rpcs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    rpcId: varchar("rpc_id", { length: 256 }),
    serviceId: varchar("service_id", { length: 256 }).notNull(),
  },
  (mnetRemoteService2rpcs) => {
    return {
      rpcIdIndex: uniqueIndex("mnet_remote_service2rpcs_rpc_id_idx").on(
        mnetRemoteService2rpcs.rpcId,
      ),
    };
  },
);

// Schema for mnetRemoteService2rpcs - used to validate API requests
const baseSchema = createSelectSchema(mnetRemoteService2rpcs);

export const insertMnetRemoteService2rpcSchema = createInsertSchema(
  mnetRemoteService2rpcs,
);
export const insertMnetRemoteService2rpcParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateMnetRemoteService2rpcSchema = baseSchema;
export const updateMnetRemoteService2rpcParams = baseSchema.extend({});
export const mnetRemoteService2rpcIdSchema = baseSchema.pick({ id: true });

// Types for mnetRemoteService2rpcs - used to type API request params and within Components
export type MnetRemoteService2rpc = typeof mnetRemoteService2rpcs.$inferSelect;
export type NewMnetRemoteService2rpc = z.infer<
  typeof insertMnetRemoteService2rpcSchema
>;
export type NewMnetRemoteService2rpcParams = z.infer<
  typeof insertMnetRemoteService2rpcParams
>;
export type UpdateMnetRemoteService2rpcParams = z.infer<
  typeof updateMnetRemoteService2rpcParams
>;
export type MnetRemoteService2rpcId = z.infer<
  typeof mnetRemoteService2rpcIdSchema
>["id"];

// this type infers the return from getMnetRemoteService2rpcs() - meaning it will include any joins
export type CompleteMnetRemoteService2rpc = Awaited<
  ReturnType<typeof getMnetRemoteService2rpcs>
>["mnetRemoteService2rpcs"][number];
