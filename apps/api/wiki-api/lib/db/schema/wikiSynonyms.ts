import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getWikiSynonyms } from "../../api/wikiSynonyms/queries";
import { wikiPages } from "./wikiPages";
import { wikiSubwikis } from "./wikiSubwikis";

export const wikiSynonyms = pgTable(
  "wiki_synonyms",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    wikiPageId: varchar("wiki_page_id", { length: 256 })
      .references(() => wikiPages.id, { onDelete: "cascade" })
      .notNull(),
    pageSynonym: varchar("page_synonym", { length: 256 }),
    wikiSubwikiId: varchar("wiki_subwiki_id", { length: 256 })
      .references(() => wikiSubwikis.id, { onDelete: "cascade" })
      .notNull(),
  },
  (wikiSynonyms) => {
    return {
      wikiPageIdIndex: uniqueIndex("wiki_synonyms_wiki_page_id_idx").on(
        wikiSynonyms.wikiPageId,
      ),
    };
  },
);

// Schema for wikiSynonyms - used to validate API requests
const baseSchema = createSelectSchema(wikiSynonyms);

export const insertWikiSynonymSchema = createInsertSchema(wikiSynonyms);
export const insertWikiSynonymParams = baseSchema
  .extend({
    wikiPageId: z.coerce.string().min(1),
    wikiSubwikiId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateWikiSynonymSchema = baseSchema;
export const updateWikiSynonymParams = baseSchema.extend({
  wikiPageId: z.coerce.string().min(1),
  wikiSubwikiId: z.coerce.string().min(1),
});
export const wikiSynonymIdSchema = baseSchema.pick({ id: true });

// Types for wikiSynonyms - used to type API request params and within Components
export type WikiSynonym = typeof wikiSynonyms.$inferSelect;
export type NewWikiSynonym = z.infer<typeof insertWikiSynonymSchema>;
export type NewWikiSynonymParams = z.infer<typeof insertWikiSynonymParams>;
export type UpdateWikiSynonymParams = z.infer<typeof updateWikiSynonymParams>;
export type WikiSynonymId = z.infer<typeof wikiSynonymIdSchema>["id"];

// this type infers the return from getWikiSynonyms() - meaning it will include any joins
export type CompleteWikiSynonym = Awaited<
  ReturnType<typeof getWikiSynonyms>
>["wikiSynonyms"][number];
