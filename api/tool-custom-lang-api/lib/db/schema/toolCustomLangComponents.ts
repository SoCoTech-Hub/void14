import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getToolCustomLangComponents } from '@/lib/api/toolCustomLangComponents/queries'

import { nanoid } from '@/lib/utils'

export const toolCustomLangComponents = pgTable('tool_custom_lang_components', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }),
	version: varchar('version', { length: 256 })
})

// Schema for toolCustomLangComponents - used to validate API requests
const baseSchema = createSelectSchema(toolCustomLangComponents)

export const insertToolCustomLangComponentSchema = createInsertSchema(
	toolCustomLangComponents
)
export const insertToolCustomLangComponentParams = baseSchema.extend({}).omit({
	id: true
})

export const updateToolCustomLangComponentSchema = baseSchema
export const updateToolCustomLangComponentParams = baseSchema.extend({})
export const toolCustomLangComponentIdSchema = baseSchema.pick({ id: true })

// Types for toolCustomLangComponents - used to type API request params and within Components
export type ToolCustomLangComponent =
	typeof toolCustomLangComponents.$inferSelect
export type NewToolCustomLangComponent = z.infer<
	typeof insertToolCustomLangComponentSchema
>
export type NewToolCustomLangComponentParams = z.infer<
	typeof insertToolCustomLangComponentParams
>
export type UpdateToolCustomLangComponentParams = z.infer<
	typeof updateToolCustomLangComponentParams
>
export type ToolCustomLangComponentId = z.infer<
	typeof toolCustomLangComponentIdSchema
>['id']

// this type infers the return from getToolCustomLangComponents() - meaning it will include any joins
export type CompleteToolCustomLangComponent = Awaited<
	ReturnType<typeof getToolCustomLangComponents>
>['toolCustomLangComponents'][number]
