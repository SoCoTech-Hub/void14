import { varchar, text, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getFaqCategories } from '@/lib/api/faqCategories/queries'

import { nanoid } from '@/lib/utils'

export const faqCategories = pgTable('faq_categories', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	image: varchar('image', { length: 256 }),
	description: text('description'),
	background: varchar('background', { length: 256 })
})

// Schema for faqCategories - used to validate API requests
const baseSchema = createSelectSchema(faqCategories)

export const insertFaqCategorySchema = createInsertSchema(faqCategories)
export const insertFaqCategoryParams = baseSchema.extend({}).omit({
	id: true
})

export const updateFaqCategorySchema = baseSchema
export const updateFaqCategoryParams = baseSchema.extend({})
export const faqCategoryIdSchema = baseSchema.pick({ id: true })

// Types for faqCategories - used to type API request params and within Components
export type FaqCategory = typeof faqCategories.$inferSelect
export type NewFaqCategory = z.infer<typeof insertFaqCategorySchema>
export type NewFaqCategoryParams = z.infer<typeof insertFaqCategoryParams>
export type UpdateFaqCategoryParams = z.infer<typeof updateFaqCategoryParams>
export type FaqCategoryId = z.infer<typeof faqCategoryIdSchema>['id']

// this type infers the return from getFaqCategories() - meaning it will include any joins
export type CompleteFaqCategory = Awaited<
	ReturnType<typeof getFaqCategories>
>['faqCategories'][number]
