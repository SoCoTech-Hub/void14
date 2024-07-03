import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getMassMailRecipients } from '@/lib/api/massMailRecipients/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const massMailRecipients = pgTable('mass_mail_recipients', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	surname: varchar('surname', { length: 256 }),
	fullName: varchar('full_name', { length: 256 }),
	mobile: varchar('mobile', { length: 256 }),
	email: varchar('email', { length: 256 }),
	title: varchar('title', { length: 256 }),
	company: varchar('company', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for massMailRecipients - used to validate API requests
const baseSchema = createSelectSchema(massMailRecipients).omit(timestamps)

export const insertMassMailRecipientSchema =
	createInsertSchema(massMailRecipients).omit(timestamps)
export const insertMassMailRecipientParams = baseSchema.extend({}).omit({
	id: true,
	userId: true
})

export const updateMassMailRecipientSchema = baseSchema
export const updateMassMailRecipientParams = baseSchema.extend({}).omit({
	userId: true
})
export const massMailRecipientIdSchema = baseSchema.pick({ id: true })

// Types for massMailRecipients - used to type API request params and within Components
export type MassMailRecipient = typeof massMailRecipients.$inferSelect
export type NewMassMailRecipient = z.infer<typeof insertMassMailRecipientSchema>
export type NewMassMailRecipientParams = z.infer<
	typeof insertMassMailRecipientParams
>
export type UpdateMassMailRecipientParams = z.infer<
	typeof updateMassMailRecipientParams
>
export type MassMailRecipientId = z.infer<
	typeof massMailRecipientIdSchema
>['id']

// this type infers the return from getMassMailRecipients() - meaning it will include any joins
export type CompleteMassMailRecipient = Awaited<
	ReturnType<typeof getMassMailRecipients>
>['massMailRecipients'][number]
