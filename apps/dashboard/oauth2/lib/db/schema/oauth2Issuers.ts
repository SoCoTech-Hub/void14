import { sql } from 'drizzle-orm'
import {
	text,
	boolean,
	varchar,
	integer,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getOauth2Issuers } from '@/lib/api/oauth2Issuers/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const oauth2Issuers = pgTable(
	'oauth2_issuers',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		allowedDomains: text('allowed_domains'),
		baseUrl: text('base_url'),
		basicAuth: boolean('basic_auth'),
		clientId: text('client_id'),
		clientSecret: text('client_secret'),
		enabled: boolean('enabled').notNull(),
		image: text('image'),
		loginPageName: varchar('login_page_name', { length: 256 }).notNull(),
		loginParams: text('login_params').notNull(),
		loginParamsOffline: text('login_params_offline').notNull(),
		loginScopes: text('login_scopes').notNull(),
		loginScopesOffline: text('login_scopes_offline').notNull(),
		scopesSupported: text('scopes_supported').notNull(),
		name: varchar('name', { length: 256 }).notNull(),
		requireConfirmation: boolean('require_confirmation').notNull(),
		serviceType: varchar('service_type', { length: 256 }).notNull(),
		showOnLoginPage: boolean('show_on_login_page').notNull(),
		sortOrder: integer('sort_order').notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(oauth2Issuers) => {
		return {
			nameIndex: uniqueIndex('name_idx').on(oauth2Issuers.name)
		}
	}
)

// Schema for oauth2Issuers - used to validate API requests
const baseSchema = createSelectSchema(oauth2Issuers).omit(timestamps)

export const insertOauth2IssuerSchema =
	createInsertSchema(oauth2Issuers).omit(timestamps)
export const insertOauth2IssuerParams = baseSchema
	.extend({
		basicAuth: z.coerce.boolean(),
		enabled: z.coerce.boolean(),
		requireConfirmation: z.coerce.boolean(),
		showOnLoginPage: z.coerce.boolean(),
		sortOrder: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateOauth2IssuerSchema = baseSchema
export const updateOauth2IssuerParams = baseSchema
	.extend({
		basicAuth: z.coerce.boolean(),
		enabled: z.coerce.boolean(),
		requireConfirmation: z.coerce.boolean(),
		showOnLoginPage: z.coerce.boolean(),
		sortOrder: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const oauth2IssuerIdSchema = baseSchema.pick({ id: true })

// Types for oauth2Issuers - used to type API request params and within Components
export type Oauth2Issuer = typeof oauth2Issuers.$inferSelect
export type NewOauth2Issuer = z.infer<typeof insertOauth2IssuerSchema>
export type NewOauth2IssuerParams = z.infer<typeof insertOauth2IssuerParams>
export type UpdateOauth2IssuerParams = z.infer<typeof updateOauth2IssuerParams>
export type Oauth2IssuerId = z.infer<typeof oauth2IssuerIdSchema>['id']

// this type infers the return from getOauth2Issuers() - meaning it will include any joins
export type CompleteOauth2Issuer = Awaited<
	ReturnType<typeof getOauth2Issuers>
>['oauth2Issuers'][number]
