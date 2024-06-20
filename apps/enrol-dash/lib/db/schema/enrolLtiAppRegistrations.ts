import { sql } from 'drizzle-orm'
import { text, varchar, boolean, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getEnrolLtiAppRegistrations } from '@/lib/api/enrolLtiAppRegistrations/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const enrolLtiAppRegistrations = pgTable('enrol_lti_app_registrations', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	accessTokenUrl: text('access_token_url'),
	authenticationRequestUrl: text('authentication_request_url'),
	clientId: varchar('client_id', { length: 256 }),
	jwksUrl: text('jwks_url'),
	name: varchar('name', { length: 256 }),
	platformClientHash: varchar('platform_client_hash', { length: 256 }),
	platformId: text('platform_id'),
	platformUniqueIdHash: varchar('platform_unique_id_hash', { length: 256 }),
	status: boolean('status'),
	uniqueId: varchar('unique_id', { length: 256 }),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for enrolLtiAppRegistrations - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiAppRegistrations).omit(timestamps)

export const insertEnrolLtiAppRegistrationSchema = createInsertSchema(
	enrolLtiAppRegistrations
).omit(timestamps)
export const insertEnrolLtiAppRegistrationParams = baseSchema
	.extend({
		status: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateEnrolLtiAppRegistrationSchema = baseSchema
export const updateEnrolLtiAppRegistrationParams = baseSchema.extend({
	status: z.coerce.boolean()
})
export const enrolLtiAppRegistrationIdSchema = baseSchema.pick({ id: true })

// Types for enrolLtiAppRegistrations - used to type API request params and within Components
export type EnrolLtiAppRegistration =
	typeof enrolLtiAppRegistrations.$inferSelect
export type NewEnrolLtiAppRegistration = z.infer<
	typeof insertEnrolLtiAppRegistrationSchema
>
export type NewEnrolLtiAppRegistrationParams = z.infer<
	typeof insertEnrolLtiAppRegistrationParams
>
export type UpdateEnrolLtiAppRegistrationParams = z.infer<
	typeof updateEnrolLtiAppRegistrationParams
>
export type EnrolLtiAppRegistrationId = z.infer<
	typeof enrolLtiAppRegistrationIdSchema
>['id']

// this type infers the return from getEnrolLtiAppRegistrations() - meaning it will include any joins
export type CompleteEnrolLtiAppRegistration = Awaited<
	ReturnType<typeof getEnrolLtiAppRegistrations>
>['enrolLtiAppRegistrations'][number]
