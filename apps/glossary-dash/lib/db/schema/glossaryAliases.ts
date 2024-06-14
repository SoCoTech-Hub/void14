import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getGlossaryAliases } from "@/lib/api/glossaryAliases/queries";

import { nanoid } from "@/lib/utils";


export const glossaryAliases = pgTable('glossary_aliases', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  alias: varchar("alias", { length: 256 }),
  entryId: varchar("entry_id", { length: 256 })
});


// Schema for glossaryAliases - used to validate API requests
const baseSchema = createSelectSchema(glossaryAliases)

export const insertGlossaryAliasSchema = createInsertSchema(glossaryAliases);
export const insertGlossaryAliasParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateGlossaryAliasSchema = baseSchema;
export const updateGlossaryAliasParams = baseSchema.extend({})
export const glossaryAliasIdSchema = baseSchema.pick({ id: true });

// Types for glossaryAliases - used to type API request params and within Components
export type GlossaryAlias = typeof glossaryAliases.$inferSelect;
export type NewGlossaryAlias = z.infer<typeof insertGlossaryAliasSchema>;
export type NewGlossaryAliasParams = z.infer<typeof insertGlossaryAliasParams>;
export type UpdateGlossaryAliasParams = z.infer<typeof updateGlossaryAliasParams>;
export type GlossaryAliasId = z.infer<typeof glossaryAliasIdSchema>["id"];
    
// this type infers the return from getGlossaryAliases() - meaning it will include any joins
export type CompleteGlossaryAlias = Awaited<ReturnType<typeof getGlossaryAliases>>["glossaryAliases"][number];

