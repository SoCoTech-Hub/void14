import { boolean, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const mnetRemoteRpc = pgTable(
  "mnet_remote_rpc",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    enabled: boolean("enabled").notNull(),
    functionName: varchar("function_name", { length: 256 }).notNull(),
    pluginName: varchar("plugin_name", { length: 256 }).notNull(),
    pluginType: varchar("plugin_type", { length: 256 }).notNull(),
    xmlRpcPath: varchar("xml_rpc_path", { length: 256 }).notNull(),
  },
  (mnetRemoteRpc) => {
    return {
      functionNameIndex: uniqueIndex("function_name_idx").on(
        mnetRemoteRpc.functionName,
      ),
    };
  },
);

// Schema for mnetRemoteRpc - used to validate API requests
const baseSchema = createSelectSchema(mnetRemoteRpc);

export const insertMnetRemoteRpcSchema = createInsertSchema(mnetRemoteRpc);
export const insertMnetRemoteRpcParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateMnetRemoteRpcSchema = baseSchema;
export const updateMnetRemoteRpcParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
});
export const mnetRemoteRpcIdSchema = baseSchema.pick({ id: true });

// Types for mnetRemoteRpc - used to type API request params and within Components
export type MnetRemoteRpc = typeof mnetRemoteRpc.$inferSelect;
export type NewMnetRemoteRpc = z.infer<typeof insertMnetRemoteRpcSchema>;
export type NewMnetRemoteRpcParams = z.infer<typeof insertMnetRemoteRpcParams>;
export type UpdateMnetRemoteRpcParams = z.infer<
  typeof updateMnetRemoteRpcParams
>;
export type MnetRemoteRpcId = z.infer<typeof mnetRemoteRpcIdSchema>["id"];
