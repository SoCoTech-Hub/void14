import { sql } from 'drizzle-orm'
import { varchar, text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getEditorAttoAutosaves } from '@/lib/api/editorAttoAutosaves/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const editorAttoAutosaves = pgTable('editor_atto_autosaves', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	contextId: varchar('context_id', { length: 256 }),
	draftId: varchar('draft_id', { length: 256 }),
	draftText: text('draft_text'),
	elementId: varchar('element_id', { length: 256 }),
	pageHash: varchar('page_hash', { length: 256 }),
	pageInstance: varchar('page_instance', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for editorAttoAutosaves - used to validate API requests
const baseSchema = createSelectSchema(editorAttoAutosaves).omit(timestamps)

export const insertEditorAttoAutosaveSchema =
	createInsertSchema(editorAttoAutosaves).omit(timestamps)
export const insertEditorAttoAutosaveParams = baseSchema.extend({}).omit({
	id: true,
	userId: true
})

export const updateEditorAttoAutosaveSchema = baseSchema
export const updateEditorAttoAutosaveParams = baseSchema.extend({}).omit({
	userId: true
})
export const editorAttoAutosaveIdSchema = baseSchema.pick({ id: true })

// Types for editorAttoAutosaves - used to type API request params and within Components
export type EditorAttoAutosave = typeof editorAttoAutosaves.$inferSelect
export type NewEditorAttoAutosave = z.infer<
	typeof insertEditorAttoAutosaveSchema
>
export type NewEditorAttoAutosaveParams = z.infer<
	typeof insertEditorAttoAutosaveParams
>
export type UpdateEditorAttoAutosaveParams = z.infer<
	typeof updateEditorAttoAutosaveParams
>
export type EditorAttoAutosaveId = z.infer<
	typeof editorAttoAutosaveIdSchema
>['id']

// this type infers the return from getEditorAttoAutosaves() - meaning it will include any joins
export type CompleteEditorAttoAutosave = Awaited<
	ReturnType<typeof getEditorAttoAutosaves>
>['editorAttoAutosaves'][number]
