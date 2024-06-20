import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getGlossaryEntriesCategories } from '@/lib/api/glossaryEntriesCategories/queries'

import { nanoid } from '@/lib/utils'

export const glossaryEntriesCategories = pgTable(
	'glossary_entries_categories',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		categoryId: varchar('category_id', { length: 256 }),
		entryId: varchar('entry_id', { length: 256 })
	}
)

// Schema for glossaryEntriesCategories - used to validate API requests
const baseSchema = createSelectSchema(glossaryEntriesCategories)

export const insertGlossaryEntriesCategorySchema = createInsertSchema(
	glossaryEntriesCategories
)
export const insertGlossaryEntriesCategoryParams = baseSchema.extend({}).omit({
	id: true
})

export const updateGlossaryEntriesCategorySchema = baseSchema
export const updateGlossaryEntriesCategoryParams = baseSchema.extend({})
export const glossaryEntriesCategoryIdSchema = baseSchema.pick({ id: true })

// Types for glossaryEntriesCategories - used to type API request params and within Components
export type GlossaryEntriesCategory =
	typeof glossaryEntriesCategories.$inferSelect
export type NewGlossaryEntriesCategory = z.infer<
	typeof insertGlossaryEntriesCategorySchema
>
export type NewGlossaryEntriesCategoryParams = z.infer<
	typeof insertGlossaryEntriesCategoryParams
>
export type UpdateGlossaryEntriesCategoryParams = z.infer<
	typeof updateGlossaryEntriesCategoryParams
>
export type GlossaryEntriesCategoryId = z.infer<
	typeof glossaryEntriesCategoryIdSchema
>['id']

// this type infers the return from getGlossaryEntriesCategories() - meaning it will include any joins
export type CompleteGlossaryEntriesCategory = Awaited<
	ReturnType<typeof getGlossaryEntriesCategories>
>['glossaryEntriesCategories'][number]
