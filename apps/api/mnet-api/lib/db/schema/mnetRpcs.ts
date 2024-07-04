import {
  boolean,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getMnetRpcs } from "../../api/mnetRpcs/queries";

export const mnetRpcs = pgTable(
  "mnet_rpcs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    classname: varchar("classname", { length: 256 }),
    enabled: boolean("enabled").notNull(),
    fileName: varchar("file_name", { length: 256 }).notNull(),
    functionName: varchar("function_name", { length: 256 }).notNull(),
    help: text("help"),
    pluginName: varchar("plugin_name", { length: 256 }).notNull(),
    pluginType: varchar("plugin_type", { length: 256 }).notNull(),
    profile: text("profile"),
    static: boolean("static"),
    xmlRpcPath: varchar("xml_rpc_path", { length: 256 }).notNull(),
  },
  (mnetRpcs) => {
    return {
      functionNameIndex: uniqueIndex("mnet_rpcs_function_name_idx").on(
        mnetRpcs.functionName,
      ),
    };
  },
);

// Schema for mnetRpcs - used to validate API requests
const baseSchema = createSelectSchema(mnetRpcs);

export const insertMnetRpcSchema = createInsertSchema(mnetRpcs);
export const insertMnetRpcParams = baseSchema
  .extend({
    enabled: z.coerce.boolean(),
    static: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateMnetRpcSchema = baseSchema;
export const updateMnetRpcParams = baseSchema.extend({
  enabled: z.coerce.boolean(),
  static: z.coerce.boolean(),
});
export const mnetRpcIdSchema = baseSchema.pick({ id: true });

// Types for mnetRpcs - used to type API request params and within Components
export type MnetRpc = typeof mnetRpcs.$inferSelect;
export type NewMnetRpc = z.infer<typeof insertMnetRpcSchema>;
export type NewMnetRpcParams = z.infer<typeof insertMnetRpcParams>;
export type UpdateMnetRpcParams = z.infer<typeof updateMnetRpcParams>;
export type MnetRpcId = z.infer<typeof mnetRpcIdSchema>["id"];

// this type infers the return from getMnetRpcs() - meaning it will include any joins
export type CompleteMnetRpc = Awaited<
  ReturnType<typeof getMnetRpcs>
>["mnetRpcs"][number];
