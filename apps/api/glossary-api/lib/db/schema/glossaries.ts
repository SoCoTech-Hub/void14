import { type getGlossaries } from "@/lib/api/glossaries/queries";
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

export const glossaries = pgTable("glossaries", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  allowComments: boolean("allow_comments"),
  allowDuplicatedEntries: boolean("allow_duplicated_entries"),
  allowPrintView: boolean("allow_print_view"),
  approvalDisplayFormat: varchar("approval_display_format", { length: 256 }),
  assessed: boolean("assessed"),
  assessTimeFinish: timestamp("assess_time_finish"),
  assessTimeStart: timestamp("assess_time_start"),
  completionEntries: integer("completion_entries"),
  course: varchar("course", { length: 256 }),
  defaultApproval: boolean("default_approval"),
  displayFormat: varchar("display_format", { length: 256 }),
  editAlways: boolean("edit_always"),
  entByPage: integer("ent_by_page"),
  globalGlossary: boolean("global_glossary"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  mainGlossary: boolean("main_glossary"),
  name: varchar("name", { length: 256 }),
  rssArticles: integer("rss_articles"),
  rssType: integer("rss_type"),
  scale: integer("scale"),
  showAll: boolean("show_all"),
  showAlphabet: boolean("show_alphabet"),
  showSpecial: boolean("show_special"),
  useDynaLink: boolean("use_dyna_link"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for glossaries - used to validate API requests
const baseSchema = createSelectSchema(glossaries).omit(timestamps);

export const insertGlossarySchema =
  createInsertSchema(glossaries).omit(timestamps);
export const insertGlossaryParams = baseSchema
  .extend({
    allowComments: z.coerce.boolean(),
    allowDuplicatedEntries: z.coerce.boolean(),
    allowPrintView: z.coerce.boolean(),
    assessed: z.coerce.boolean(),
    assessTimeFinish: z.coerce.string().min(1),
    assessTimeStart: z.coerce.string().min(1),
    completionEntries: z.coerce.number(),
    defaultApproval: z.coerce.boolean(),
    editAlways: z.coerce.boolean(),
    entByPage: z.coerce.number(),
    globalGlossary: z.coerce.boolean(),
    introFormat: z.coerce.number(),
    mainGlossary: z.coerce.boolean(),
    rssArticles: z.coerce.number(),
    rssType: z.coerce.number(),
    scale: z.coerce.number(),
    showAll: z.coerce.boolean(),
    showAlphabet: z.coerce.boolean(),
    showSpecial: z.coerce.boolean(),
    useDynaLink: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateGlossarySchema = baseSchema;
export const updateGlossaryParams = baseSchema.extend({
  allowComments: z.coerce.boolean(),
  allowDuplicatedEntries: z.coerce.boolean(),
  allowPrintView: z.coerce.boolean(),
  assessed: z.coerce.boolean(),
  assessTimeFinish: z.coerce.string().min(1),
  assessTimeStart: z.coerce.string().min(1),
  completionEntries: z.coerce.number(),
  defaultApproval: z.coerce.boolean(),
  editAlways: z.coerce.boolean(),
  entByPage: z.coerce.number(),
  globalGlossary: z.coerce.boolean(),
  introFormat: z.coerce.number(),
  mainGlossary: z.coerce.boolean(),
  rssArticles: z.coerce.number(),
  rssType: z.coerce.number(),
  scale: z.coerce.number(),
  showAll: z.coerce.boolean(),
  showAlphabet: z.coerce.boolean(),
  showSpecial: z.coerce.boolean(),
  useDynaLink: z.coerce.boolean(),
});
export const glossaryIdSchema = baseSchema.pick({ id: true });

// Types for glossaries - used to type API request params and within Components
export type Glossary = typeof glossaries.$inferSelect;
export type NewGlossary = z.infer<typeof insertGlossarySchema>;
export type NewGlossaryParams = z.infer<typeof insertGlossaryParams>;
export type UpdateGlossaryParams = z.infer<typeof updateGlossaryParams>;
export type GlossaryId = z.infer<typeof glossaryIdSchema>["id"];

// this type infers the return from getGlossaries() - meaning it will include any joins
export type CompleteGlossary = Awaited<
  ReturnType<typeof getGlossaries>
>["glossaries"][number];
