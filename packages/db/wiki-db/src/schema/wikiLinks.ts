import { varchar, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { wikiPages } from './wikiPages'

import { nanoid } from '@soco/utils'

export const wikiLinks = pgTable(
	'wiki_links',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		fromPageId: varchar('from_page_id', { length: 256 })
			.references(() => wikiPages.id, { onDelete: 'cascade' })
			.notNull(),
		subWikiId: varchar('sub_wiki_id', { length: 256 })
			.references(() => wikiPages.id, { onDelete: 'cascade' })
			.notNull(),
		toMissingPage: varchar('to_missing_page', { length: 256 })
			.references(() => wikiPages.id, { onDelete: 'cascade' })
			.notNull(),
		toPageId: varchar('to_page_id', { length: 256 })
			.references(() => wikiPages.id, { onDelete: 'cascade' })
			.notNull()
	},
	(wikiLinks) => {
		return {
			fromPageIdIndex: uniqueIndex('from_page_id_idx').on(wikiLinks.fromPageId)
		}
	}
)

// Schema for wikiLinks - used to validate API requests
const baseSchema = createSelectSchema(wikiLinks)

export const insertWikiLinkSchema = createInsertSchema(wikiLinks)
export const insertWikiLinkParams = baseSchema
	.extend({
		fromPageId: z.coerce.string().min(1),
		subWikiId: z.coerce.string().min(1),
		toMissingPage: z.coerce.string().min(1),
		toPageId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateWikiLinkSchema = baseSchema
export const updateWikiLinkParams = baseSchema.extend({
	fromPageId: z.coerce.string().min(1),
	subWikiId: z.coerce.string().min(1),
	toMissingPage: z.coerce.string().min(1),
	toPageId: z.coerce.string().min(1)
})
export const wikiLinkIdSchema = baseSchema.pick({ id: true })

// Types for wikiLinks - used to type API request params and within Components
export type WikiLink = typeof wikiLinks.$inferSelect
export type NewWikiLink = z.infer<typeof insertWikiLinkSchema>
export type NewWikiLinkParams = z.infer<typeof insertWikiLinkParams>
export type UpdateWikiLinkParams = z.infer<typeof updateWikiLinkParams>
export type WikiLinkId = z.infer<typeof wikiLinkIdSchema>['id']


