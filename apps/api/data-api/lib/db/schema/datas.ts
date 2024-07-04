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

import { type getDatas } from "../../api/datas/queries";

export const datas = pgTable("datas", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  addTemplate: text("add_template"),
  approval: boolean("approval"),
  assessed: integer("assessed"),
  assessTimeFinish: integer("assess_time_finish"),
  assessTimeStart: integer("assess_time_start"),
  comments: boolean("comments"),
  completionEntries: integer("completion_entries"),
  config: text("config"),
  course: integer("course"),
  cssTemplate: text("css_template"),
  defaultSort: integer("default_sort"),
  defaultSortDir: boolean("default_sort_dir"),
  editAny: boolean("edit_any"),
  intro: text("intro"),
  introFormat: boolean("intro_format"),
  jsTemplate: text("js_template"),
  listTemplate: text("list_template"),
  listTemplateFooter: text("list_template_footer"),
  listTemplateHeader: text("list_template_header"),
  manageApproved: boolean("manage_approved"),
  maxEntries: integer("max_entries"),
  name: varchar("name", { length: 256 }),
  notification: integer("notification"),
  requiredEntries: integer("required_entries"),
  requiredEntriesToView: integer("required_entries_to_view"),
  rssArticles: integer("rss_articles"),
  rssTemplate: text("rss_template"),
  rssTitleTemplate: text("rss_title_template"),
  scale: integer("scale"),
  searchTemplate: text("search_template"),
  singleTemplate: text("single_template"),
  timeAvailableFrom: integer("time_available_from"),
  timeAvailableTo: integer("time_available_to"),
  timeViewFrom: integer("time_view_from"),
  timeViewTo: integer("time_view_to"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for datas - used to validate API requests
const baseSchema = createSelectSchema(datas).omit(timestamps);

export const insertDataSchema = createInsertSchema(datas).omit(timestamps);
export const insertDataParams = baseSchema
  .extend({
    approval: z.coerce.boolean(),
    assessed: z.coerce.number(),
    assessTimeFinish: z.coerce.number(),
    assessTimeStart: z.coerce.number(),
    comments: z.coerce.boolean(),
    completionEntries: z.coerce.number(),
    course: z.coerce.number(),
    defaultSort: z.coerce.number(),
    defaultSortDir: z.coerce.boolean(),
    editAny: z.coerce.boolean(),
    introFormat: z.coerce.boolean(),
    manageApproved: z.coerce.boolean(),
    maxEntries: z.coerce.number(),
    notification: z.coerce.number(),
    requiredEntries: z.coerce.number(),
    requiredEntriesToView: z.coerce.number(),
    rssArticles: z.coerce.number(),
    scale: z.coerce.number(),
    timeAvailableFrom: z.coerce.number(),
    timeAvailableTo: z.coerce.number(),
    timeViewFrom: z.coerce.number(),
    timeViewTo: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateDataSchema = baseSchema;
export const updateDataParams = baseSchema.extend({
  approval: z.coerce.boolean(),
  assessed: z.coerce.number(),
  assessTimeFinish: z.coerce.number(),
  assessTimeStart: z.coerce.number(),
  comments: z.coerce.boolean(),
  completionEntries: z.coerce.number(),
  course: z.coerce.number(),
  defaultSort: z.coerce.number(),
  defaultSortDir: z.coerce.boolean(),
  editAny: z.coerce.boolean(),
  introFormat: z.coerce.boolean(),
  manageApproved: z.coerce.boolean(),
  maxEntries: z.coerce.number(),
  notification: z.coerce.number(),
  requiredEntries: z.coerce.number(),
  requiredEntriesToView: z.coerce.number(),
  rssArticles: z.coerce.number(),
  scale: z.coerce.number(),
  timeAvailableFrom: z.coerce.number(),
  timeAvailableTo: z.coerce.number(),
  timeViewFrom: z.coerce.number(),
  timeViewTo: z.coerce.number(),
});
export const dataIdSchema = baseSchema.pick({ id: true });

// Types for datas - used to type API request params and within Components
export type Data = typeof datas.$inferSelect;
export type NewData = z.infer<typeof insertDataSchema>;
export type NewDataParams = z.infer<typeof insertDataParams>;
export type UpdateDataParams = z.infer<typeof updateDataParams>;
export type DataId = z.infer<typeof dataIdSchema>["id"];

// this type infers the return from getDatas() - meaning it will include any joins
export type CompleteData = Awaited<
  ReturnType<typeof getDatas>
>["datas"][number];
