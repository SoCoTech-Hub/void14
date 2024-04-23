import {
	varchar,
	text,
	integer,
	boolean,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { badges } from './badges'
import { type getBadgeCriterias } from '@/lib/api/badgeCriterias/queries'

import { nanoid } from '@/lib/utils'

export const badgeCriterias = pgTable(
	'badge_criterias',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		badgeId: varchar('badge_id', { length: 256 })
			.references(() => badges.id)
			.notNull(),
		criteriaType: varchar('criteria_type', { length: 256 }),
		description: text('description'),
		descriptionFormat: integer('description_format'),
		method: boolean('method')
	},
	(badgeCriterias) => {
		return {
			badgeIdIndex: uniqueIndex('bc_badge_id_idx').on(badgeCriterias.badgeId)
		}
	}
)

// Schema for badgeCriterias - used to validate API requests
const baseSchema = createSelectSchema(badgeCriterias)

export const insertBadgeCriteriaSchema = createInsertSchema(badgeCriterias)
export const insertBadgeCriteriaParams = baseSchema
	.extend({
		badgeId: z.coerce.string().min(1),
		descriptionFormat: z.coerce.number(),
		method: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateBadgeCriteriaSchema = baseSchema
export const updateBadgeCriteriaParams = baseSchema.extend({
	badgeId: z.coerce.string().min(1),
	descriptionFormat: z.coerce.number(),
	method: z.coerce.boolean()
})
export const badgeCriteriaIdSchema = baseSchema.pick({ id: true })

// Types for badgeCriterias - used to type API request params and within Components
export type BadgeCriteria = typeof badgeCriterias.$inferSelect
export type NewBadgeCriteria = z.infer<typeof insertBadgeCriteriaSchema>
export type NewBadgeCriteriaParams = z.infer<typeof insertBadgeCriteriaParams>
export type UpdateBadgeCriteriaParams = z.infer<
	typeof updateBadgeCriteriaParams
>
export type BadgeCriteriaId = z.infer<typeof badgeCriteriaIdSchema>['id']

// this type infers the return from getBadgeCriterias() - meaning it will include any joins
export type CompleteBadgeCriteria = Awaited<
	ReturnType<typeof getBadgeCriterias>
>['badgeCriterias'][number]
