import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getUrls } from "../../api/urls/queries";

export const urls = pgTable(
  "urls",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    courseId: varchar("course_id", { length: 256 }),
    display: integer("display"),
    displayOptions: text("display_options"),
    externalUrl: text("external_url"),
    intro: text("intro"),
    introFormat: integer("intro_format"),
    name: varchar("name", { length: 256 }),
    parameters: text("parameters"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (urls) => {
    return {
      courseIdIndex: uniqueIndex("course_id_idx").on(urls.courseId),
    };
  },
);

// Schema for urls - used to validate API requests
const baseSchema = createSelectSchema(urls).omit(timestamps);

export const insertUrlSchema = createInsertSchema(urls).omit(timestamps);
export const insertUrlParams = baseSchema
  .extend({
    display: z.coerce.number(),
    introFormat: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateUrlSchema = baseSchema;
export const updateUrlParams = baseSchema.extend({
  display: z.coerce.number(),
  introFormat: z.coerce.number(),
});
export const urlIdSchema = baseSchema.pick({ id: true });

// Types for urls - used to type API request params and within Components
export type Url = typeof urls.$inferSelect;
export type NewUrl = z.infer<typeof insertUrlSchema>;
export type NewUrlParams = z.infer<typeof insertUrlParams>;
export type UpdateUrlParams = z.infer<typeof updateUrlParams>;
export type UrlId = z.infer<typeof urlIdSchema>["id"];

// this type infers the return from getUrls() - meaning it will include any joins
export type CompleteUrl = Awaited<ReturnType<typeof getUrls>>["urls"][number];
