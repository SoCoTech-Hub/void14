import { sql } from 'drizzle-orm'
import { integer, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getMessageConversationActions } from '@/lib/api/messageConversationActions/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const messageConversationActions = pgTable(
	'message_conversation_actions',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		action: integer('action'),
		conversationId: varchar('conversation_id', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	}
)

// Schema for messageConversationActions - used to validate API requests
const baseSchema = createSelectSchema(messageConversationActions).omit(
	timestamps
)

export const insertMessageConversationActionSchema = createInsertSchema(
	messageConversationActions
).omit(timestamps)
export const insertMessageConversationActionParams = baseSchema
	.extend({
		action: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateMessageConversationActionSchema = baseSchema
export const updateMessageConversationActionParams = baseSchema
	.extend({
		action: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const messageConversationActionIdSchema = baseSchema.pick({ id: true })

// Types for messageConversationActions - used to type API request params and within Components
export type MessageConversationAction =
	typeof messageConversationActions.$inferSelect
export type NewMessageConversationAction = z.infer<
	typeof insertMessageConversationActionSchema
>
export type NewMessageConversationActionParams = z.infer<
	typeof insertMessageConversationActionParams
>
export type UpdateMessageConversationActionParams = z.infer<
	typeof updateMessageConversationActionParams
>
export type MessageConversationActionId = z.infer<
	typeof messageConversationActionIdSchema
>['id']

// this type infers the return from getMessageConversationActions() - meaning it will include any joins
export type CompleteMessageConversationAction = Awaited<
	ReturnType<typeof getMessageConversationActions>
>['messageConversationActions'][number]
