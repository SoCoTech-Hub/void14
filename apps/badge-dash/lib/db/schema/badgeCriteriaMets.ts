import { varchar, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { badgeCriterias } from './badgeCriterias'
import { type getBadgeCriteriaMets } from '@/lib/api/badgeCriteriaMets/queries'

import { nanoid } from '@/lib/utils'

export const badgeCriteriaMets = pgTable('badge_criteria_mets', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	badgeCriteriaId: varchar('badge_criteria_id', { length: 256 })
		.references(() => badgeCriterias.id)
		.notNull(),
	dateMet: integer('date_met'),
	issuedId: varchar('issued_id', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull()
})

// Schema for badgeCriteriaMets - used to validate API requests
const baseSchema = createSelectSchema(badgeCriteriaMets)

export const insertBadgeCriteriaMetSchema =
	createInsertSchema(badgeCriteriaMets)
export const insertBadgeCriteriaMetParams = baseSchema
	.extend({
		badgeCriteriaId: z.coerce.string().min(1),
		dateMet: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateBadgeCriteriaMetSchema = baseSchema
export const updateBadgeCriteriaMetParams = baseSchema
	.extend({
		badgeCriteriaId: z.coerce.string().min(1),
		dateMet: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const badgeCriteriaMetIdSchema = baseSchema.pick({ id: true })

// Types for badgeCriteriaMets - used to type API request params and within Components
export type BadgeCriteriaMet = typeof badgeCriteriaMets.$inferSelect
export type NewBadgeCriteriaMet = z.infer<typeof insertBadgeCriteriaMetSchema>
export type NewBadgeCriteriaMetParams = z.infer<
	typeof insertBadgeCriteriaMetParams
>
export type UpdateBadgeCriteriaMetParams = z.infer<
	typeof updateBadgeCriteriaMetParams
>
export type BadgeCriteriaMetId = z.infer<typeof badgeCriteriaMetIdSchema>['id']

// this type infers the return from getBadgeCriteriaMets() - meaning it will include any joins
export type CompleteBadgeCriteriaMet = Awaited<
	ReturnType<typeof getBadgeCriteriaMets>
>['badgeCriteriaMets'][number]
