import { varchar, boolean, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getMyPages } from '@/lib/api/myPages/queries'

import { nanoid } from '@/lib/utils'

export const myPages = pgTable(
	'my_pages',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		name: varchar('name', { length: 256 }),
		private: boolean('private'),
		sortOrder: integer('sort_order'),
		userId: varchar('user_id', { length: 256 }).notNull()
	},
	(myPages) => {
		return {
			nameIndex: uniqueIndex('name_idx').on(myPages.name)
		}
	}
)

// Schema for myPages - used to validate API requests
const baseSchema = createSelectSchema(myPages)

export const insertMyPageSchema = createInsertSchema(myPages)
export const insertMyPageParams = baseSchema
	.extend({
		private: z.coerce.boolean(),
		sortOrder: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateMyPageSchema = baseSchema
export const updateMyPageParams = baseSchema
	.extend({
		private: z.coerce.boolean(),
		sortOrder: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const myPageIdSchema = baseSchema.pick({ id: true })

// Types for myPages - used to type API request params and within Components
export type MyPage = typeof myPages.$inferSelect
export type NewMyPage = z.infer<typeof insertMyPageSchema>
export type NewMyPageParams = z.infer<typeof insertMyPageParams>
export type UpdateMyPageParams = z.infer<typeof updateMyPageParams>
export type MyPageId = z.infer<typeof myPageIdSchema>['id']

// this type infers the return from getMyPages() - meaning it will include any joins
export type CompleteMyPage = Awaited<
	ReturnType<typeof getMyPages>
>['myPages'][number]
