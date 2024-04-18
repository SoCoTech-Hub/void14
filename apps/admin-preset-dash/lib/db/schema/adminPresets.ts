import { sql } from 'drizzle-orm'
import { varchar, text, boolean, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getAdminPresets } from '@/lib/api/adminPresets/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const adminPresets = pgTable('admin_presets', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	author: varchar('author', { length: 256 }),
	comments: text('comments'),
	isCore: boolean('is_core'),
	name: varchar('name', { length: 256 }),
	site: varchar('site', { length: 256 }),
	timeImported: timestamp('time_imported'),
	timeCreated: timestamp('time_created'),
	userId: varchar('user_id', { length: 256 }).notNull(),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for adminPresets - used to validate API requests
const baseSchema = createSelectSchema(adminPresets).omit(timestamps)

export const insertAdminPresetSchema =
	createInsertSchema(adminPresets).omit(timestamps)
export const insertAdminPresetParams = baseSchema
	.extend({
		isCore: z.coerce.boolean(),
		timeImported: z.coerce.string().min(1),
		timeCreated: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateAdminPresetSchema = baseSchema
export const updateAdminPresetParams = baseSchema
	.extend({
		isCore: z.coerce.boolean(),
		timeImported: z.coerce.string().min(1),
		timeCreated: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const adminPresetIdSchema = baseSchema.pick({ id: true })

// Types for adminPresets - used to type API request params and within Components
export type AdminPreset = typeof adminPresets.$inferSelect
export type NewAdminPreset = z.infer<typeof insertAdminPresetSchema>
export type NewAdminPresetParams = z.infer<typeof insertAdminPresetParams>
export type UpdateAdminPresetParams = z.infer<typeof updateAdminPresetParams>
export type AdminPresetId = z.infer<typeof adminPresetIdSchema>['id']

// this type infers the return from getAdminPresets() - meaning it will include any joins
export type CompleteAdminPreset = Awaited<
	ReturnType<typeof getAdminPresets>
>['adminPresets'][number]
