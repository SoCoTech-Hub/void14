import { sql } from 'drizzle-orm'
import { text, integer, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getToolDataprivacyCategories } from '@/lib/api/toolDataprivacyCategories/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const toolDataprivacyCategories = pgTable(
	'tool_dataprivacy_categories',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		description: text('description'),
		descriptionFormat: integer('description_format'),
		name: varchar('name', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	}
)

// Schema for toolDataprivacyCategories - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyCategories).omit(
	timestamps
)

export const insertToolDataprivacyCategorySchema = createInsertSchema(
	toolDataprivacyCategories
).omit(timestamps)
export const insertToolDataprivacyCategoryParams = baseSchema
	.extend({
		descriptionFormat: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateToolDataprivacyCategorySchema = baseSchema
export const updateToolDataprivacyCategoryParams = baseSchema
	.extend({
		descriptionFormat: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const toolDataprivacyCategoryIdSchema = baseSchema.pick({ id: true })

// Types for toolDataprivacyCategories - used to type API request params and within Components
export type ToolDataprivacyCategory =
	typeof toolDataprivacyCategories.$inferSelect
export type NewToolDataprivacyCategory = z.infer<
	typeof insertToolDataprivacyCategorySchema
>
export type NewToolDataprivacyCategoryParams = z.infer<
	typeof insertToolDataprivacyCategoryParams
>
export type UpdateToolDataprivacyCategoryParams = z.infer<
	typeof updateToolDataprivacyCategoryParams
>
export type ToolDataprivacyCategoryId = z.infer<
	typeof toolDataprivacyCategoryIdSchema
>['id']

// this type infers the return from getToolDataprivacyCategories() - meaning it will include any joins
export type CompleteToolDataprivacyCategory = Awaited<
	ReturnType<typeof getToolDataprivacyCategories>
>['toolDataprivacyCategories'][number]
