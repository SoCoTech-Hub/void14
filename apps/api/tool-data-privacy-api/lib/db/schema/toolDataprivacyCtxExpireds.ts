import { sql } from 'drizzle-orm'
import {
	varchar,
	boolean,
	text,
	integer,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getToolDataprivacyCtxExpireds } from '@/lib/api/toolDataprivacyCtxExpireds/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const toolDataprivacyCtxExpireds = pgTable(
	'tool_dataprivacy_ctx_expireds',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		contextId: varchar('context_id', { length: 256 }),
		defaultExpired: boolean('default_expired'),
		expiredRoles: text('expired_roles'),
		status: integer('status'),
		unexpiredRoles: text('unexpired_roles'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	}
)

// Schema for toolDataprivacyCtxExpireds - used to validate API requests
const baseSchema = createSelectSchema(toolDataprivacyCtxExpireds).omit(
	timestamps
)

export const insertToolDataprivacyCtxExpiredSchema = createInsertSchema(
	toolDataprivacyCtxExpireds
).omit(timestamps)
export const insertToolDataprivacyCtxExpiredParams = baseSchema
	.extend({
		defaultExpired: z.coerce.boolean(),
		status: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateToolDataprivacyCtxExpiredSchema = baseSchema
export const updateToolDataprivacyCtxExpiredParams = baseSchema
	.extend({
		defaultExpired: z.coerce.boolean(),
		status: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const toolDataprivacyCtxExpiredIdSchema = baseSchema.pick({ id: true })

// Types for toolDataprivacyCtxExpireds - used to type API request params and within Components
export type ToolDataprivacyCtxExpired =
	typeof toolDataprivacyCtxExpireds.$inferSelect
export type NewToolDataprivacyCtxExpired = z.infer<
	typeof insertToolDataprivacyCtxExpiredSchema
>
export type NewToolDataprivacyCtxExpiredParams = z.infer<
	typeof insertToolDataprivacyCtxExpiredParams
>
export type UpdateToolDataprivacyCtxExpiredParams = z.infer<
	typeof updateToolDataprivacyCtxExpiredParams
>
export type ToolDataprivacyCtxExpiredId = z.infer<
	typeof toolDataprivacyCtxExpiredIdSchema
>['id']

// this type infers the return from getToolDataprivacyCtxExpireds() - meaning it will include any joins
export type CompleteToolDataprivacyCtxExpired = Awaited<
	ReturnType<typeof getToolDataprivacyCtxExpireds>
>['toolDataprivacyCtxExpireds'][number]
