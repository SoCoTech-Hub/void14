import { type getBlocks } from "@/lib/api/blocks/queries";
import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const blocks = pgTable(
  "blocks",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    cronId: varchar("cron_id", { length: 256 }),
    lastCron: timestamp("last_cron"),
    name: varchar("name", { length: 256 }),
    visible: boolean("visible"),
  },
  (blocks) => {
    return {
      cronIdIndex: uniqueIndex("b_cron_id_idx").on(blocks.cronId),
    };
  },
);

// Schema for blocks - used to validate API requests
const baseSchema = createSelectSchema(blocks);

export const insertBlockSchema = createInsertSchema(blocks);
export const insertBlockParams = baseSchema
  .extend({
    lastCron: z.coerce.string().min(1),
    visible: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateBlockSchema = baseSchema;
export const updateBlockParams = baseSchema.extend({
  lastCron: z.coerce.string().min(1),
  visible: z.coerce.boolean(),
});
export const blockIdSchema = baseSchema.pick({ id: true });

// Types for blocks - used to type API request params and within Components
export type Block = typeof blocks.$inferSelect;
export type NewBlock = z.infer<typeof insertBlockSchema>;
export type NewBlockParams = z.infer<typeof insertBlockParams>;
export type UpdateBlockParams = z.infer<typeof updateBlockParams>;
export type BlockId = z.infer<typeof blockIdSchema>["id"];

// this type infers the return from getBlocks() - meaning it will include any joins
export type CompleteBlock = Awaited<
  ReturnType<typeof getBlocks>
>["blocks"][number];
