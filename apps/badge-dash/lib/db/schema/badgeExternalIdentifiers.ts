import { varchar, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { badgeBackpacks } from './badgeBackpacks'
import { type getBadgeExternalIdentifiers } from '@/lib/api/badgeExternalIdentifiers/queries'

import { nanoid } from '@/lib/utils'

export const badgeExternalIdentifiers = pgTable(
	'badge_external_identifiers',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		externalId: varchar('external_id', { length: 256 }),
		internalId: varchar('internal_id', { length: 256 }),
		badgeBackpackId: varchar('badge_backpack_id', { length: 256 })
			.references(() => badgeBackpacks.id)
			.notNull(),
		type: varchar('type', { length: 256 })
	},
	(badgeExternalIdentifiers) => {
		return {
			internalIdIndex: uniqueIndex('bei_internal_id_idx').on(
				badgeExternalIdentifiers.internalId
			)
		}
	}
)

// Schema for badgeExternalIdentifiers - used to validate API requests
const baseSchema = createSelectSchema(badgeExternalIdentifiers)

export const insertBadgeExternalIdentifierSchema = createInsertSchema(
	badgeExternalIdentifiers
)
export const insertBadgeExternalIdentifierParams = baseSchema
	.extend({
		badgeBackpackId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateBadgeExternalIdentifierSchema = baseSchema
export const updateBadgeExternalIdentifierParams = baseSchema.extend({
	badgeBackpackId: z.coerce.string().min(1)
})
export const badgeExternalIdentifierIdSchema = baseSchema.pick({ id: true })

// Types for badgeExternalIdentifiers - used to type API request params and within Components
export type BadgeExternalIdentifier =
	typeof badgeExternalIdentifiers.$inferSelect
export type NewBadgeExternalIdentifier = z.infer<
	typeof insertBadgeExternalIdentifierSchema
>
export type NewBadgeExternalIdentifierParams = z.infer<
	typeof insertBadgeExternalIdentifierParams
>
export type UpdateBadgeExternalIdentifierParams = z.infer<
	typeof updateBadgeExternalIdentifierParams
>
export type BadgeExternalIdentifierId = z.infer<
	typeof badgeExternalIdentifierIdSchema
>['id']

// this type infers the return from getBadgeExternalIdentifiers() - meaning it will include any joins
export type CompleteBadgeExternalIdentifier = Awaited<
	ReturnType<typeof getBadgeExternalIdentifiers>
>['badgeExternalIdentifiers'][number]
