import { sql } from 'drizzle-orm'
import {
	boolean,
	text,
	varchar,
	integer,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { quizaccessSebTemplates } from './quizaccessSebTemplates'
import { type getQuizaccessSebQuizSettings } from '@/lib/api/quizaccessSebQuizSettings/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const quizaccessSebQuizSettings = pgTable(
	'quizaccess_seb_quiz_settings',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		activateUrlFiltering: boolean('activate_url_filtering'),
		allowedBrowserExamKeys: text('allowed_browser_exam_keys'),
		allowReloadInExam: boolean('allow_reload_in_exam').notNull(),
		allowSpellChecking: boolean('allow_spell_checking').notNull(),
		allowUserQuitSeb: boolean('allow_user_quit_seb').notNull(),
		cmId: varchar('cm_id', { length: 256 }).notNull(),
		enableAudioControl: boolean('enable_audio_control').notNull(),
		expressionsAllowed: text('expressions_allowed'),
		expressionsBlocked: text('expressions_blocked'),
		filterEmbeddedContent: boolean('filter_embedded_content').notNull(),
		linkQuitseb: text('link_quitseb'),
		muteOnStartup: boolean('mute_on_startup').notNull(),
		quitPassword: text('quit_password'),
		del: integer('del'),
		quizId: varchar('quiz_id', { length: 256 }).notNull(),
		regexAllowed: text('regex_allowed'),
		regexBlocked: text('regex_blocked'),
		requireSafeExamBrowser: boolean('require_safe_exam_browser').notNull(),
		showKeyboardLayout: boolean('show_keyboard_layout').notNull(),
		showReloadButton: boolean('show_reload_button').notNull(),
		showSebDownloadLink: boolean('show_seb_download_link').notNull(),
		showSebTaskbar: boolean('show_seb_taskbar').notNull(),
		showTime: boolean('show_time').notNull(),
		showWifiControl: boolean('show_wifi_control').notNull(),
		quizaccessSebTemplateId: varchar('quizaccess_seb_template_id', {
			length: 256
		})
			.references(() => quizaccessSebTemplates.id)
			.notNull(),
		userConfirmQuit: boolean('user_confirm_quit').notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(quizaccessSebQuizSettings) => {
		return {
			quizaccessSebTemplateIdIndex: uniqueIndex(
				'quizaccess_seb_quiz_settings_quizaccess_seb_template_id_idx'
			).on(quizaccessSebQuizSettings.quizaccessSebTemplateId)
		}
	}
)

// Schema for quizaccessSebQuizSettings - used to validate API requests
const baseSchema = createSelectSchema(quizaccessSebQuizSettings).omit(
	timestamps
)

export const insertQuizaccessSebQuizSettingSchema = createInsertSchema(
	quizaccessSebQuizSettings
).omit(timestamps)
export const insertQuizaccessSebQuizSettingParams = baseSchema
	.extend({
		activateUrlFiltering: z.coerce.boolean(),
		allowReloadInExam: z.coerce.boolean(),
		allowSpellChecking: z.coerce.boolean(),
		allowUserQuitSeb: z.coerce.boolean(),
		enableAudioControl: z.coerce.boolean(),
		filterEmbeddedContent: z.coerce.boolean(),
		muteOnStartup: z.coerce.boolean(),
		del: z.coerce.number(),
		requireSafeExamBrowser: z.coerce.boolean(),
		showKeyboardLayout: z.coerce.boolean(),
		showReloadButton: z.coerce.boolean(),
		showSebDownloadLink: z.coerce.boolean(),
		showSebTaskbar: z.coerce.boolean(),
		showTime: z.coerce.boolean(),
		showWifiControl: z.coerce.boolean(),
		quizaccessSebTemplateId: z.coerce.string().min(1),
		userConfirmQuit: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateQuizaccessSebQuizSettingSchema = baseSchema
export const updateQuizaccessSebQuizSettingParams = baseSchema
	.extend({
		activateUrlFiltering: z.coerce.boolean(),
		allowReloadInExam: z.coerce.boolean(),
		allowSpellChecking: z.coerce.boolean(),
		allowUserQuitSeb: z.coerce.boolean(),
		enableAudioControl: z.coerce.boolean(),
		filterEmbeddedContent: z.coerce.boolean(),
		muteOnStartup: z.coerce.boolean(),
		del: z.coerce.number(),
		requireSafeExamBrowser: z.coerce.boolean(),
		showKeyboardLayout: z.coerce.boolean(),
		showReloadButton: z.coerce.boolean(),
		showSebDownloadLink: z.coerce.boolean(),
		showSebTaskbar: z.coerce.boolean(),
		showTime: z.coerce.boolean(),
		showWifiControl: z.coerce.boolean(),
		quizaccessSebTemplateId: z.coerce.string().min(1),
		userConfirmQuit: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const quizaccessSebQuizSettingIdSchema = baseSchema.pick({ id: true })

// Types for quizaccessSebQuizSettings - used to type API request params and within Components
export type QuizaccessSebQuizSetting =
	typeof quizaccessSebQuizSettings.$inferSelect
export type NewQuizaccessSebQuizSetting = z.infer<
	typeof insertQuizaccessSebQuizSettingSchema
>
export type NewQuizaccessSebQuizSettingParams = z.infer<
	typeof insertQuizaccessSebQuizSettingParams
>
export type UpdateQuizaccessSebQuizSettingParams = z.infer<
	typeof updateQuizaccessSebQuizSettingParams
>
export type QuizaccessSebQuizSettingId = z.infer<
	typeof quizaccessSebQuizSettingIdSchema
>['id']

// this type infers the return from getQuizaccessSebQuizSettings() - meaning it will include any joins
export type CompleteQuizaccessSebQuizSetting = Awaited<
	ReturnType<typeof getQuizaccessSebQuizSettings>
>['quizaccessSebQuizSettings'][number]
