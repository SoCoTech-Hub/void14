import {
	varchar,
	boolean,
	integer,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { blockInstances } from './blockInstances'
import { type getBlockPositions } from '@/lib/api/blockPositions/queries'

import { nanoid } from '@/lib/utils'

export const blockPositions = pgTable(
	'block_positions',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		blockInstanceId: varchar('block_instance_id', { length: 256 })
			.references(() => blockInstances.id)
			.notNull(),
		contextId: varchar('context_id', { length: 256 }),
		pageType: varchar('page_type', { length: 256 }),
		region: varchar('region', { length: 256 }),
		subPage: varchar('sub_page', { length: 256 }),
		visible: boolean('visible'),
		weight: integer('weight')
	},
	(blockPositions) => {
		return {
			blockInstanceIdIndex: uniqueIndex('bp_block_instance_id_idx').on(
				blockPositions.blockInstanceId
			)
		}
	}
)

// Schema for blockPositions - used to validate API requests
const baseSchema = createSelectSchema(blockPositions)

export const insertBlockPositionSchema = createInsertSchema(blockPositions)
export const insertBlockPositionParams = baseSchema
	.extend({
		blockInstanceId: z.coerce.string().min(1),
		visible: z.coerce.boolean(),
		weight: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateBlockPositionSchema = baseSchema
export const updateBlockPositionParams = baseSchema.extend({
	blockInstanceId: z.coerce.string().min(1),
	visible: z.coerce.boolean(),
	weight: z.coerce.number()
})
export const blockPositionIdSchema = baseSchema.pick({ id: true })

// Types for blockPositions - used to type API request params and within Components
export type BlockPosition = typeof blockPositions.$inferSelect
export type NewBlockPosition = z.infer<typeof insertBlockPositionSchema>
export type NewBlockPositionParams = z.infer<typeof insertBlockPositionParams>
export type UpdateBlockPositionParams = z.infer<
	typeof updateBlockPositionParams
>
export type BlockPositionId = z.infer<typeof blockPositionIdSchema>['id']

// this type infers the return from getBlockPositions() - meaning it will include any joins
export type CompleteBlockPosition = Awaited<
	ReturnType<typeof getBlockPositions>
>['blockPositions'][number]
