import { sql } from 'drizzle-orm'
import {
	boolean,
	timestamp,
	integer,
	varchar,
	text,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getBigBlueButtonBns } from '@/lib/api/bigBlueButtonBns/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const bigBlueButtonBns = pgTable(
	'big_blue_button_bns',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		clientType: boolean('client_type'),
		closingTime: timestamp('closing_time'),
		completionAttendance: integer('completion_attendance'),
		completionEngagementChats: integer('completion_engagement_chats'),
		completionEngagementEmojis: integer('completion_engagement_emojis'),
		completionEngagementPollVotes: integer('completion_engagement_poll_votes'),
		completionEngagementRaiseHand: integer('completion_engagement_raise_hand'),
		completionEngagementTalks: integer('completion_engagement_talks'),
		courseId: varchar('course_id', { length: 256 }),
		disableCam: boolean('disable_cam'),
		disableMic: boolean('disable_mic'),
		disableNote: boolean('disable_note'),
		disablePrivateChat: boolean('disable_private_chat'),
		disablePublicChat: boolean('disable_public_chat'),
		hideUserList: boolean('hide_user_list'),
		intro: text('intro'),
		introFormat: integer('intro_format'),
		lockedLayout: boolean('locked_layout'),
		lockOnJoin: boolean('lock_on_join'),
		lockOnJoinConfigurable: boolean('lock_on_join_configurable'),
		meetingId: varchar('meeting_id', { length: 256 }),
		moderatorPass: varchar('moderator_pass', { length: 256 }),
		muteOnStart: boolean('mute_on_start'),
		name: varchar('name', { length: 256 }),
		openingTime: timestamp('opening_time'),
		participants: text('participants'),
		presentation: text('presentation'),
		record: boolean('record'),
		recordAllFromStart: boolean('record_all_from_start'),
		recordHideButton: boolean('record_hide_button'),
		recordingsDeleted: boolean('recordings_deleted'),
		recordingsHtml: boolean('recordings_html'),
		recordingsImported: boolean('recordings_imported'),
		recordingsPreview: boolean('recordings_preview'),
		type: integer('type'),
		userLimit: integer('user_limit'),
		viewerPass: varchar('viewer_pass', { length: 256 }),
		voiceBridge: integer('voice_bridge'),
		wait: boolean('wait'),
		welcome: text('welcome'),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(bigBlueButtonBns) => {
		return {
			courseIdIndex: uniqueIndex('course_id_idx').on(bigBlueButtonBns.courseId)
		}
	}
)

// Schema for bigBlueButtonBns - used to validate API requests
const baseSchema = createSelectSchema(bigBlueButtonBns).omit(timestamps)

export const insertBigBlueButtonBnSchema =
	createInsertSchema(bigBlueButtonBns).omit(timestamps)
export const insertBigBlueButtonBnParams = baseSchema
	.extend({
		clientType: z.coerce.boolean(),
		closingTime: z.coerce.string().min(1),
		completionAttendance: z.coerce.number(),
		completionEngagementChats: z.coerce.number(),
		completionEngagementEmojis: z.coerce.number(),
		completionEngagementPollVotes: z.coerce.number(),
		completionEngagementRaiseHand: z.coerce.number(),
		completionEngagementTalks: z.coerce.number(),
		disableCam: z.coerce.boolean(),
		disableMic: z.coerce.boolean(),
		disableNote: z.coerce.boolean(),
		disablePrivateChat: z.coerce.boolean(),
		disablePublicChat: z.coerce.boolean(),
		hideUserList: z.coerce.boolean(),
		introFormat: z.coerce.number(),
		lockedLayout: z.coerce.boolean(),
		lockOnJoin: z.coerce.boolean(),
		lockOnJoinConfigurable: z.coerce.boolean(),
		muteOnStart: z.coerce.boolean(),
		openingTime: z.coerce.string().min(1),
		record: z.coerce.boolean(),
		recordAllFromStart: z.coerce.boolean(),
		recordHideButton: z.coerce.boolean(),
		recordingsDeleted: z.coerce.boolean(),
		recordingsHtml: z.coerce.boolean(),
		recordingsImported: z.coerce.boolean(),
		recordingsPreview: z.coerce.boolean(),
		type: z.coerce.number(),
		userLimit: z.coerce.number(),
		voiceBridge: z.coerce.number(),
		wait: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateBigBlueButtonBnSchema = baseSchema
export const updateBigBlueButtonBnParams = baseSchema.extend({
	clientType: z.coerce.boolean(),
	closingTime: z.coerce.string().min(1),
	completionAttendance: z.coerce.number(),
	completionEngagementChats: z.coerce.number(),
	completionEngagementEmojis: z.coerce.number(),
	completionEngagementPollVotes: z.coerce.number(),
	completionEngagementRaiseHand: z.coerce.number(),
	completionEngagementTalks: z.coerce.number(),
	disableCam: z.coerce.boolean(),
	disableMic: z.coerce.boolean(),
	disableNote: z.coerce.boolean(),
	disablePrivateChat: z.coerce.boolean(),
	disablePublicChat: z.coerce.boolean(),
	hideUserList: z.coerce.boolean(),
	introFormat: z.coerce.number(),
	lockedLayout: z.coerce.boolean(),
	lockOnJoin: z.coerce.boolean(),
	lockOnJoinConfigurable: z.coerce.boolean(),
	muteOnStart: z.coerce.boolean(),
	openingTime: z.coerce.string().min(1),
	record: z.coerce.boolean(),
	recordAllFromStart: z.coerce.boolean(),
	recordHideButton: z.coerce.boolean(),
	recordingsDeleted: z.coerce.boolean(),
	recordingsHtml: z.coerce.boolean(),
	recordingsImported: z.coerce.boolean(),
	recordingsPreview: z.coerce.boolean(),
	type: z.coerce.number(),
	userLimit: z.coerce.number(),
	voiceBridge: z.coerce.number(),
	wait: z.coerce.boolean()
})
export const bigBlueButtonBnIdSchema = baseSchema.pick({ id: true })

// Types for bigBlueButtonBns - used to type API request params and within Components
export type BigBlueButtonBn = typeof bigBlueButtonBns.$inferSelect
export type NewBigBlueButtonBn = z.infer<typeof insertBigBlueButtonBnSchema>
export type NewBigBlueButtonBnParams = z.infer<
	typeof insertBigBlueButtonBnParams
>
export type UpdateBigBlueButtonBnParams = z.infer<
	typeof updateBigBlueButtonBnParams
>
export type BigBlueButtonBnId = z.infer<typeof bigBlueButtonBnIdSchema>['id']

// this type infers the return from getBigBlueButtonBns() - meaning it will include any joins
export type CompleteBigBlueButtonBn = Awaited<
	ReturnType<typeof getBigBlueButtonBns>
>['bigBlueButtonBns'][number]
