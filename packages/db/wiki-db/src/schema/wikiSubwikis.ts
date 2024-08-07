import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { wikis } from "./wikis";

export const wikiSubwikis = pgTable(
  "wiki_subwikis",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    groupId: varchar("group_id", { length: 256 }),
    wikiId: varchar("wiki_id", { length: 256 })
      .references(() => wikis.id)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (wikiSubwikis) => {
    return {
      wikiIdIndex: uniqueIndex("wiki_id_idx").on(wikiSubwikis.wikiId),
    };
  },
);

// Schema for wikiSubwikis - used to validate API requests
const baseSchema = createSelectSchema(wikiSubwikis);

export const insertWikiSubwikiSchema = createInsertSchema(wikiSubwikis);
export const insertWikiSubwikiParams = baseSchema
  .extend({
    wikiId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWikiSubwikiSchema = baseSchema;
export const updateWikiSubwikiParams = baseSchema
  .extend({
    wikiId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const wikiSubwikiIdSchema = baseSchema.pick({ id: true });

// Types for wikiSubwikis - used to type API request params and within Components
export type WikiSubwiki = typeof wikiSubwikis.$inferSelect;
export type NewWikiSubwiki = z.infer<typeof insertWikiSubwikiSchema>;
export type NewWikiSubwikiParams = z.infer<typeof insertWikiSubwikiParams>;
export type UpdateWikiSubwikiParams = z.infer<typeof updateWikiSubwikiParams>;
export type WikiSubwikiId = z.infer<typeof wikiSubwikiIdSchema>["id"];
