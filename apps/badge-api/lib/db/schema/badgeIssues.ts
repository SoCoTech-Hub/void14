import {
	varchar,
	integer,
	timestamp,
	text,
	boolean,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { badges } from './badges'
import { type getBadgeIssues } from '@/lib/api/badgeIssues/queries'

import { nanoid } from '@/lib/utils'

export const badgeIssues = pgTable(
	'badge_issues',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		badgeId: varchar('badge_id', { length: 256 })
			.references(() => badges.id)
			.notNull(),
		dateExpire: integer('date_expire'),
		dateIssued: timestamp('date_issued'),
		issuerNotified: varchar('issuer_notified', { length: 256 }),
		uniqueHash: text('unique_hash'),
		visible: boolean('visible'),
		userId: varchar('user_id', { length: 256 }).notNull()
	},
	(badgeIssues) => {
		return {
			badgeIdIndex: uniqueIndex('bi_badge_id_idx').on(badgeIssues.badgeId)
		}
	}
)

// Schema for badgeIssues - used to validate API requests
const baseSchema = createSelectSchema(badgeIssues)

export const insertBadgeIssueSchema = createInsertSchema(badgeIssues)
export const insertBadgeIssueParams = baseSchema
	.extend({
		badgeId: z.coerce.string().min(1),
		dateExpire: z.coerce.number(),
		dateIssued: z.coerce.string().min(1),
		visible: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateBadgeIssueSchema = baseSchema
export const updateBadgeIssueParams = baseSchema
	.extend({
		badgeId: z.coerce.string().min(1),
		dateExpire: z.coerce.number(),
		dateIssued: z.coerce.string().min(1),
		visible: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const badgeIssueIdSchema = baseSchema.pick({ id: true })

// Types for badgeIssues - used to type API request params and within Components
export type BadgeIssue = typeof badgeIssues.$inferSelect
export type NewBadgeIssue = z.infer<typeof insertBadgeIssueSchema>
export type NewBadgeIssueParams = z.infer<typeof insertBadgeIssueParams>
export type UpdateBadgeIssueParams = z.infer<typeof updateBadgeIssueParams>
export type BadgeIssueId = z.infer<typeof badgeIssueIdSchema>['id']

// this type infers the return from getBadgeIssues() - meaning it will include any joins
export type CompleteBadgeIssue = Awaited<
	ReturnType<typeof getBadgeIssues>
>['badgeIssues'][number]
