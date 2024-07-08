import { type getGlossaryEntries } from "@/lib/api/glossaryEntries/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const glossaryEntries = pgTable("glossary_entries", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  approved: boolean("approved"),
  attachment: varchar("attachment", { length: 256 }),
  caseSensitive: boolean("case_sensitive"),
  concept: varchar("concept", { length: 256 }),
  definition: text("definition"),
  definitionTrust: boolean("definition_trust"),
  definitionFormat: integer("definition_format"),
  fullMatch: boolean("full_match"),
  glossaryId: varchar("glossary_id", { length: 256 }),
  sourceGlossaryId: varchar("source_glossary_id", { length: 256 }),
  teacherEntry: boolean("teacher_entry"),
  useDynaLink: boolean("use_dyna_link"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for glossaryEntries - used to validate API requests
const baseSchema = createSelectSchema(glossaryEntries).omit(timestamps);

export const insertGlossaryEntrySchema =
  createInsertSchema(glossaryEntries).omit(timestamps);
export const insertGlossaryEntryParams = baseSchema
  .extend({
    approved: z.coerce.boolean(),
    caseSensitive: z.coerce.boolean(),
    definitionTrust: z.coerce.boolean(),
    definitionFormat: z.coerce.number(),
    fullMatch: z.coerce.boolean(),
    teacherEntry: z.coerce.boolean(),
    useDynaLink: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateGlossaryEntrySchema = baseSchema;
export const updateGlossaryEntryParams = baseSchema
  .extend({
    approved: z.coerce.boolean(),
    caseSensitive: z.coerce.boolean(),
    definitionTrust: z.coerce.boolean(),
    definitionFormat: z.coerce.number(),
    fullMatch: z.coerce.boolean(),
    teacherEntry: z.coerce.boolean(),
    useDynaLink: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const glossaryEntryIdSchema = baseSchema.pick({ id: true });

// Types for glossaryEntries - used to type API request params and within Components
export type GlossaryEntry = typeof glossaryEntries.$inferSelect;
export type NewGlossaryEntry = z.infer<typeof insertGlossaryEntrySchema>;
export type NewGlossaryEntryParams = z.infer<typeof insertGlossaryEntryParams>;
export type UpdateGlossaryEntryParams = z.infer<
  typeof updateGlossaryEntryParams
>;
export type GlossaryEntryId = z.infer<typeof glossaryEntryIdSchema>["id"];

// this type infers the return from getGlossaryEntries() - meaning it will include any joins
export type CompleteGlossaryEntry = Awaited<
  ReturnType<typeof getGlossaryEntries>
>["glossaryEntries"][number];
