import { integer, timestamp, varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { affiliates } from './affiliates'
import { affiliatesStatuses } from './affiliatesStatuses'
import { type getAffiliatesTransactions } from '@/lib/api/affiliatesTransactions/queries'

import { nanoid } from '@/lib/utils'

export const affiliatesTransactions = pgTable('affiliates_transactions', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	paid: integer('paid').notNull(),
	balance: integer('balance'),
	paidDate: timestamp('paid_date'),
	accountNumber: varchar('account_number', { length: 256 }),
	affiliateId: varchar('affiliate_id', { length: 256 })
		.references(() => affiliates.id, { onDelete: 'cascade' })
		.notNull(),
	affiliatesStatusId: varchar('affiliates_status_id', { length: 256 })
		.references(() => affiliatesStatuses.id, { onDelete: 'cascade' })
		.notNull()
})

// Schema for affiliatesTransactions - used to validate API requests
const baseSchema = createSelectSchema(affiliatesTransactions)

export const insertAffiliatesTransactionSchema = createInsertSchema(
	affiliatesTransactions
)
export const insertAffiliatesTransactionParams = baseSchema
	.extend({
		paid: z.coerce.number(),
		balance: z.coerce.number(),
		paidDate: z.coerce.string().min(1),
		affiliateId: z.coerce.string().min(1),
		affiliatesStatusId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateAffiliatesTransactionSchema = baseSchema
export const updateAffiliatesTransactionParams = baseSchema.extend({
	paid: z.coerce.number(),
	balance: z.coerce.number(),
	paidDate: z.coerce.string().min(1),
	affiliateId: z.coerce.string().min(1),
	affiliatesStatusId: z.coerce.string().min(1)
})
export const affiliatesTransactionIdSchema = baseSchema.pick({ id: true })

// Types for affiliatesTransactions - used to type API request params and within Components
export type AffiliatesTransaction = typeof affiliatesTransactions.$inferSelect
export type NewAffiliatesTransaction = z.infer<
	typeof insertAffiliatesTransactionSchema
>
export type NewAffiliatesTransactionParams = z.infer<
	typeof insertAffiliatesTransactionParams
>
export type UpdateAffiliatesTransactionParams = z.infer<
	typeof updateAffiliatesTransactionParams
>
export type AffiliatesTransactionId = z.infer<
	typeof affiliatesTransactionIdSchema
>['id']

// this type infers the return from getAffiliatesTransactions() - meaning it will include any joins
export type CompleteAffiliatesTransaction = Awaited<
	ReturnType<typeof getAffiliatesTransactions>
>['affiliatesTransactions'][number]
