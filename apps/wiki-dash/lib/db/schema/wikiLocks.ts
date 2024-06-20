import { timestamp, varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { wikiPages } from './wikiPages'
import { type getWikiLocks } from '@/lib/api/wikiLocks/queries'

import { nanoid } from '@/lib/utils'

export const wikiLocks = pgTable('wiki_locks', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	lockeDate: timestamp('locke_date'),
	wikiPageId: varchar('wiki_page_id', { length: 256 })
		.references(() => wikiPages.id)
		.notNull(),
	sectionName: varchar('section_name', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull()
})

// Schema for wikiLocks - used to validate API requests
const baseSchema = createSelectSchema(wikiLocks)

export const insertWikiLockSchema = createInsertSchema(wikiLocks)
export const insertWikiLockParams = baseSchema
	.extend({
		lockeDate: z.coerce.string().min(1),
		wikiPageId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateWikiLockSchema = baseSchema
export const updateWikiLockParams = baseSchema
	.extend({
		lockeDate: z.coerce.string().min(1),
		wikiPageId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const wikiLockIdSchema = baseSchema.pick({ id: true })

// Types for wikiLocks - used to type API request params and within Components
export type WikiLock = typeof wikiLocks.$inferSelect
export type NewWikiLock = z.infer<typeof insertWikiLockSchema>
export type NewWikiLockParams = z.infer<typeof insertWikiLockParams>
export type UpdateWikiLockParams = z.infer<typeof updateWikiLockParams>
export type WikiLockId = z.infer<typeof wikiLockIdSchema>['id']

// this type infers the return from getWikiLocks() - meaning it will include any joins
export type CompleteWikiLock = Awaited<
	ReturnType<typeof getWikiLocks>
>['wikiLocks'][number]
