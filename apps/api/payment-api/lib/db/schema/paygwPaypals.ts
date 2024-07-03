import { varchar, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { payments } from './payments'
import { type getPaygwPaypals } from '@/lib/api/paygwPaypals/queries'

import { nanoid } from '@/lib/utils'

export const paygwPaypals = pgTable(
	'paygw_paypals',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		paymentId: varchar('payment_id', { length: 256 })
			.references(() => payments.id, { onDelete: 'cascade' })
			.notNull(),
		ppOrderid: varchar('pp_orderid', { length: 256 }).notNull()
	},
	(paygwPaypals) => {
		return {
			paymentIdIndex: uniqueIndex('paygw_paypals_payment_id_idx').on(
				paygwPaypals.paymentId
			)
		}
	}
)

// Schema for paygwPaypals - used to validate API requests
const baseSchema = createSelectSchema(paygwPaypals)

export const insertPaygwPaypalSchema = createInsertSchema(paygwPaypals)
export const insertPaygwPaypalParams = baseSchema
	.extend({
		paymentId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updatePaygwPaypalSchema = baseSchema
export const updatePaygwPaypalParams = baseSchema.extend({
	paymentId: z.coerce.string().min(1)
})
export const paygwPaypalIdSchema = baseSchema.pick({ id: true })

// Types for paygwPaypals - used to type API request params and within Components
export type PaygwPaypal = typeof paygwPaypals.$inferSelect
export type NewPaygwPaypal = z.infer<typeof insertPaygwPaypalSchema>
export type NewPaygwPaypalParams = z.infer<typeof insertPaygwPaypalParams>
export type UpdatePaygwPaypalParams = z.infer<typeof updatePaygwPaypalParams>
export type PaygwPaypalId = z.infer<typeof paygwPaypalIdSchema>['id']

// this type infers the return from getPaygwPaypals() - meaning it will include any joins
export type CompletePaygwPaypal = Awaited<
	ReturnType<typeof getPaygwPaypals>
>['paygwPaypals'][number]
