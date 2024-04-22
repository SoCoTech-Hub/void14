import { sql } from 'drizzle-orm'
import { varchar, integer, text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getAuthOauth2LinkedLogins } from '@/lib/api/authOauth2LinkedLogins/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const authOauth2LinkedLogins = pgTable('auth_oauth2_linked_logins', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	confirmToken: varchar('confirm_token', { length: 256 }),
	confirmTokenExpires: integer('confirm_token_expires'),
	email: text('email'),
	issuerId: varchar('issuer_id', { length: 256 }),
	userModifiedId: varchar('user_modified_id', { length: 256 }),
	userName: varchar('user_name', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for authOauth2LinkedLogins - used to validate API requests
const baseSchema = createSelectSchema(authOauth2LinkedLogins).omit(timestamps)

export const insertAuthOauth2LinkedLoginSchema = createInsertSchema(
	authOauth2LinkedLogins
).omit(timestamps)
export const insertAuthOauth2LinkedLoginParams = baseSchema
	.extend({
		confirmTokenExpires: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateAuthOauth2LinkedLoginSchema = baseSchema
export const updateAuthOauth2LinkedLoginParams = baseSchema
	.extend({
		confirmTokenExpires: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const authOauth2LinkedLoginIdSchema = baseSchema.pick({ id: true })

// Types for authOauth2LinkedLogins - used to type API request params and within Components
export type AuthOauth2LinkedLogin = typeof authOauth2LinkedLogins.$inferSelect
export type NewAuthOauth2LinkedLogin = z.infer<
	typeof insertAuthOauth2LinkedLoginSchema
>
export type NewAuthOauth2LinkedLoginParams = z.infer<
	typeof insertAuthOauth2LinkedLoginParams
>
export type UpdateAuthOauth2LinkedLoginParams = z.infer<
	typeof updateAuthOauth2LinkedLoginParams
>
export type AuthOauth2LinkedLoginId = z.infer<
	typeof authOauth2LinkedLoginIdSchema
>['id']

// this type infers the return from getAuthOauth2LinkedLogins() - meaning it will include any joins
export type CompleteAuthOauth2LinkedLogin = Awaited<
	ReturnType<typeof getAuthOauth2LinkedLogins>
>['authOauth2LinkedLogins'][number]
