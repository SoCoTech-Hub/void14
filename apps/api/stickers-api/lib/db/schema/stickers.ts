import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getStickers } from "../../api/stickers/queries";

export const stickers = pgTable("stickers", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  image: varchar("image", { length: 256 }),
  mimeType: varchar("mime_type", { length: 256 }),
  extension: varchar("extension", { length: 256 }),
});

// Schema for stickers - used to validate API requests
const baseSchema = createSelectSchema(stickers);

export const insertStickerSchema = createInsertSchema(stickers);
export const insertStickerParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateStickerSchema = baseSchema;
export const updateStickerParams = baseSchema.extend({});
export const stickerIdSchema = baseSchema.pick({ id: true });

// Types for stickers - used to type API request params and within Components
export type Sticker = typeof stickers.$inferSelect;
export type NewSticker = z.infer<typeof insertStickerSchema>;
export type NewStickerParams = z.infer<typeof insertStickerParams>;
export type UpdateStickerParams = z.infer<typeof updateStickerParams>;
export type StickerId = z.infer<typeof stickerIdSchema>["id"];

// this type infers the return from getStickers() - meaning it will include any joins
export type CompleteSticker = Awaited<
  ReturnType<typeof getStickers>
>["stickers"][number];
