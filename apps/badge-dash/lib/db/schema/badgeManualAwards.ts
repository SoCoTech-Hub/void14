import { varchar, timestamp, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { badges } from './badges'
import { type getBadgeManualAwards } from '@/lib/api/badgeManualAwards/queries'

import { nanoid } from '@/lib/utils'

export const badgeManualAwards = pgTable(
	'badge_manual_awards',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		badgeId: varchar('badge_id', { length: 256 })
			.references(() => badges.id)
			.notNull(),
		dateMet: timestamp('date_met'),
		issuerId: varchar('issuer_id', { length: 256 }),
		issuerRole: varchar('issuer_role', { length: 256 }),
		recipientId: varchar('recipient_id', { length: 256 })
	},
	(badgeManualAwards) => {
		return {
			badgeIdIndex: uniqueIndex('bma_badge_id_idx').on(
				badgeManualAwards.badgeId
			)
		}
	}
)

// Schema for badgeManualAwards - used to validate API requests
const baseSchema = createSelectSchema(badgeManualAwards)

export const insertBadgeManualAwardSchema =
	createInsertSchema(badgeManualAwards)
export const insertBadgeManualAwardParams = baseSchema
	.extend({
		badgeId: z.coerce.string().min(1),
		dateMet: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateBadgeManualAwardSchema = baseSchema
export const updateBadgeManualAwardParams = baseSchema.extend({
	badgeId: z.coerce.string().min(1),
	dateMet: z.coerce.string().min(1)
})
export const badgeManualAwardIdSchema = baseSchema.pick({ id: true })

// Types for badgeManualAwards - used to type API request params and within Components
export type BadgeManualAward = typeof badgeManualAwards.$inferSelect
export type NewBadgeManualAward = z.infer<typeof insertBadgeManualAwardSchema>
export type NewBadgeManualAwardParams = z.infer<
	typeof insertBadgeManualAwardParams
>
export type UpdateBadgeManualAwardParams = z.infer<
	typeof updateBadgeManualAwardParams
>
export type BadgeManualAwardId = z.infer<typeof badgeManualAwardIdSchema>['id']

// this type infers the return from getBadgeManualAwards() - meaning it will include any joins
export type CompleteBadgeManualAward = Awaited<
	ReturnType<typeof getBadgeManualAwards>
>['badgeManualAwards'][number]
