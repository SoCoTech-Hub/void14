import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getMnetService2rpcs } from "../../api/mnetService2rpcs/queries";
import { mnetRpcs } from "./mnetRpcs";
import { mnetServices } from "./mnetServices";

export const mnetService2rpcs = pgTable(
  "mnet_service2rpcs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    mnetServiceId: varchar("mnet_service_id", { length: 256 })
      .references(() => mnetServices.id, { onDelete: "cascade" })
      .notNull(),
    mnetRpcId: varchar("mnet_rpc_id", { length: 256 })
      .references(() => mnetRpcs.id, { onDelete: "cascade" })
      .notNull(),
  },
  (mnetService2rpcs) => {
    return {
      mnetRpcIdIndex: uniqueIndex("mnet_service2rpcs_mnet_rpc_id_idx").on(
        mnetService2rpcs.mnetRpcId,
      ),
    };
  },
);

// Schema for mnetService2rpcs - used to validate API requests
const baseSchema = createSelectSchema(mnetService2rpcs);

export const insertMnetService2rpcSchema = createInsertSchema(mnetService2rpcs);
export const insertMnetService2rpcParams = baseSchema
  .extend({
    mnetServiceId: z.coerce.string().min(1),
    mnetRpcId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateMnetService2rpcSchema = baseSchema;
export const updateMnetService2rpcParams = baseSchema.extend({
  mnetServiceId: z.coerce.string().min(1),
  mnetRpcId: z.coerce.string().min(1),
});
export const mnetService2rpcIdSchema = baseSchema.pick({ id: true });

// Types for mnetService2rpcs - used to type API request params and within Components
export type MnetService2rpc = typeof mnetService2rpcs.$inferSelect;
export type NewMnetService2rpc = z.infer<typeof insertMnetService2rpcSchema>;
export type NewMnetService2rpcParams = z.infer<
  typeof insertMnetService2rpcParams
>;
export type UpdateMnetService2rpcParams = z.infer<
  typeof updateMnetService2rpcParams
>;
export type MnetService2rpcId = z.infer<typeof mnetService2rpcIdSchema>["id"];

// this type infers the return from getMnetService2rpcs() - meaning it will include any joins
export type CompleteMnetService2rpc = Awaited<
  ReturnType<typeof getMnetService2rpcs>
>["mnetService2rpcs"][number];
