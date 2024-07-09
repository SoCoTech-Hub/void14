import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { scormScoes } from "./scormScoes";

export const scormScoesDatas = pgTable("scorm_scoes_datas", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  scormScoeId: varchar("scorm_scoe_id", { length: 256 })
    .references(() => scormScoes.id)
    .notNull(),
  value: text("value"),
});

// Schema for scormScoesDatas - used to validate API requests
const baseSchema = createSelectSchema(scormScoesDatas);

export const insertScormScoesDataSchema = createInsertSchema(scormScoesDatas);
export const insertScormScoesDataParams = baseSchema
  .extend({
    scormScoeId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateScormScoesDataSchema = baseSchema;
export const updateScormScoesDataParams = baseSchema.extend({
  scormScoeId: z.coerce.string().min(1),
});
export const scormScoesDataIdSchema = baseSchema.pick({ id: true });

// Types for scormScoesDatas - used to type API request params and within Components
export type ScormScoesData = typeof scormScoesDatas.$inferSelect;
export type NewScormScoesData = z.infer<typeof insertScormScoesDataSchema>;
export type NewScormScoesDataParams = z.infer<
  typeof insertScormScoesDataParams
>;
export type UpdateScormScoesDataParams = z.infer<
  typeof updateScormScoesDataParams
>;
export type ScormScoesDataId = z.infer<typeof scormScoesDataIdSchema>["id"];

