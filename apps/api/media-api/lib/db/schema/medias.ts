import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getMedias } from "../../api/medias/queries";

export const medias = pgTable(
  "medias",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    alt: varchar("alt", { length: 256 }),
    mime: varchar("mime", { length: 256 }),
    url: varchar("url", { length: 256 }),
    provider: varchar("provider", { length: 256 }),
    relatedId: varchar("related_id", { length: 256 }),
    relatedType: varchar("related_type", { length: 256 }),
    relatedField: varchar("related_field", { length: 256 }),
    order: integer("order"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (medias) => {
    return {
      relatedTypeIndex: uniqueIndex("related_type_idx").on(medias.relatedType),
    };
  },
);

// Schema for medias - used to validate API requests
const baseSchema = createSelectSchema(medias).omit(timestamps);

export const insertMediaSchema = createInsertSchema(medias).omit(timestamps);
export const insertMediaParams = baseSchema
  .extend({
    order: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateMediaSchema = baseSchema;
export const updateMediaParams = baseSchema.extend({
  order: z.coerce.number(),
});
export const mediaIdSchema = baseSchema.pick({ id: true });

// Types for medias - used to type API request params and within Components
export type Media = typeof medias.$inferSelect;
export type NewMedia = z.infer<typeof insertMediaSchema>;
export type NewMediaParams = z.infer<typeof insertMediaParams>;
export type UpdateMediaParams = z.infer<typeof updateMediaParams>;
export type MediaId = z.infer<typeof mediaIdSchema>["id"];

// this type infers the return from getMedias() - meaning it will include any joins
export type CompleteMedia = Awaited<
  ReturnType<typeof getMedias>
>["medias"][number];
