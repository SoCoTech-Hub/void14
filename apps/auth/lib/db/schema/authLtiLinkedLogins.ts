import { sql } from 'drizzle-orm'
import { text, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getAuthLtiLinkedLogins } from '@/lib/api/authLtiLinkedLogins/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const authLtiLinkedLogins = pgTable('auth_lti_linked_logins', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	issuer: text('issuer'),
	issuer256: varchar('issuer_256', { length: 256 }),
	sub: varchar('sub', { length: 256 }),
	sub256: varchar('sub_256', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for authLtiLinkedLogins - used to validate API requests
const baseSchema = createSelectSchema(authLtiLinkedLogins).omit(timestamps)

export const insertAuthLtiLinkedLoginSchema =
	createInsertSchema(authLtiLinkedLogins).omit(timestamps)
export const insertAuthLtiLinkedLoginParams = baseSchema.extend({}).omit({
	id: true,
	userId: true
})

export const updateAuthLtiLinkedLoginSchema = baseSchema
export const updateAuthLtiLinkedLoginParams = baseSchema.extend({}).omit({
	userId: true
})
export const authLtiLinkedLoginIdSchema = baseSchema.pick({ id: true })

// Types for authLtiLinkedLogins - used to type API request params and within Components
export type AuthLtiLinkedLogin = typeof authLtiLinkedLogins.$inferSelect
export type NewAuthLtiLinkedLogin = z.infer<
	typeof insertAuthLtiLinkedLoginSchema
>
export type NewAuthLtiLinkedLoginParams = z.infer<
	typeof insertAuthLtiLinkedLoginParams
>
export type UpdateAuthLtiLinkedLoginParams = z.infer<
	typeof updateAuthLtiLinkedLoginParams
>
export type AuthLtiLinkedLoginId = z.infer<
	typeof authLtiLinkedLoginIdSchema
>['id']

// this type infers the return from getAuthLtiLinkedLogins() - meaning it will include any joins
export type CompleteAuthLtiLinkedLogin = Awaited<
	ReturnType<typeof getAuthLtiLinkedLogins>
>['authLtiLinkedLogins'][number]
