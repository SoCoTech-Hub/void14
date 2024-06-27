import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { toolDataprivacyCategories } from './toolDataprivacyCategories'
import { toolDataprivacyPurposes } from './toolDataprivacyPurposes'
import { type getToolDataprivacyCtxLevels } from '@/lib/api/toolDataprivacyCtxLevels/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const toolDataprivacyCtxLevels = pgTable('tool_dataprivacy_ctx_levels', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	toolDataprivacyCategoryId: varchar('tool_dataprivacy_category_id', {
		length: 256
	})
		.references(() => toolDataprivacyCategories.id)
		.notNull(),
	contextLevel: varchar('context_level', { length: 256 }),
	toolDataprivacyPurposeId: varchar('tool_dataprivacy_purpose_id', {
		length: 256
	})
		.references(() => toolDataprivacyPurposes.id)
		.notNull(),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for toolDataprivacyCtxLevels - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyCtxLevels).omit(timestamps)

export const insertToolDataprivacyCtxLevelSchema = createInsertSchema(
	toolDataprivacyCtxLevels
).omit(timestamps)
export const insertToolDataprivacyCtxLevelParams = baseSchema
	.extend({
		toolDataprivacyCategoryId: z.coerce.string().min(1),
		toolDataprivacyPurposeId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateToolDataprivacyCtxLevelSchema = baseSchema
export const updateToolDataprivacyCtxLevelParams = baseSchema
	.extend({
		toolDataprivacyCategoryId: z.coerce.string().min(1),
		toolDataprivacyPurposeId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const toolDataprivacyCtxLevelIdSchema = baseSchema.pick({ id: true })

// Types for toolDataprivacyCtxLevels - used to type API request params and within Components
export type ToolDataprivacyCtxLevel =
	typeof toolDataprivacyCtxLevels.$inferSelect
export type NewToolDataprivacyCtxLevel = z.infer<
	typeof insertToolDataprivacyCtxLevelSchema
>
export type NewToolDataprivacyCtxLevelParams = z.infer<
	typeof insertToolDataprivacyCtxLevelParams
>
export type UpdateToolDataprivacyCtxLevelParams = z.infer<
	typeof updateToolDataprivacyCtxLevelParams
>
export type ToolDataprivacyCtxLevelId = z.infer<
	typeof toolDataprivacyCtxLevelIdSchema
>['id']

// this type infers the return from getToolDataprivacyCtxLevels() - meaning it will include any joins
export type CompleteToolDataprivacyCtxLevel = Awaited<
	ReturnType<typeof getToolDataprivacyCtxLevels>
>['toolDataprivacyCtxLevels'][number]
