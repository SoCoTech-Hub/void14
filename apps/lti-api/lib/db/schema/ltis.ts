import { sql } from 'drizzle-orm'
import {
	varchar,
	boolean,
	integer,
	text,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getLtis } from '@/lib/api/ltis/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const ltis = pgTable('ltis', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	course: varchar('course', { length: 256 }),
	debugLaunch: boolean('debug_launch'),
	grade: integer('grade'),
	icon: text('icon'),
	instructorChoiceAcceptGrades: boolean('instructor_choice_accept_grades'),
	instructorChoiceAllowRoster: boolean('instructor_choice_allow_roster'),
	instructorChoiceAllowSetting: boolean('instructor_choice_allow_setting'),
	instructorChoiceSendEmailAddr: boolean('instructor_choice_send_email_addr'),
	instructorChoiceSendName: boolean('instructor_choice_send_name'),
	instructorCustomParameters: text('instructor_custom_parameters'),
	intro: text('intro'),
	introFormat: integer('intro_format'),
	launchContainer: integer('launch_container'),
	name: varchar('name', { length: 256 }),
	password: varchar('password', { length: 256 }),
	resourceKey: varchar('resource_key', { length: 256 }),
	secureIcon: text('secure_icon'),
	secureToolUrl: text('secure_tool_url'),
	serviceSalt: varchar('service_salt', { length: 256 }),
	showDescriptionLaunch: boolean('show_description_launch'),
	showTitleLaunch: boolean('show_title_launch'),
	toolUrl: text('tool_url'),
	typeId: varchar('type_id', { length: 256 }),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for ltis - used to validate API requests
const baseSchema = createSelectSchema(ltis).omit(timestamps)

export const insertLtiSchema = createInsertSchema(ltis).omit(timestamps)
export const insertLtiParams = baseSchema
	.extend({
		debugLaunch: z.coerce.boolean(),
		grade: z.coerce.number(),
		instructorChoiceAcceptGrades: z.coerce.boolean(),
		instructorChoiceAllowRoster: z.coerce.boolean(),
		instructorChoiceAllowSetting: z.coerce.boolean(),
		instructorChoiceSendEmailAddr: z.coerce.boolean(),
		instructorChoiceSendName: z.coerce.boolean(),
		introFormat: z.coerce.number(),
		launchContainer: z.coerce.number(),
		showDescriptionLaunch: z.coerce.boolean(),
		showTitleLaunch: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateLtiSchema = baseSchema
export const updateLtiParams = baseSchema.extend({
	debugLaunch: z.coerce.boolean(),
	grade: z.coerce.number(),
	instructorChoiceAcceptGrades: z.coerce.boolean(),
	instructorChoiceAllowRoster: z.coerce.boolean(),
	instructorChoiceAllowSetting: z.coerce.boolean(),
	instructorChoiceSendEmailAddr: z.coerce.boolean(),
	instructorChoiceSendName: z.coerce.boolean(),
	introFormat: z.coerce.number(),
	launchContainer: z.coerce.number(),
	showDescriptionLaunch: z.coerce.boolean(),
	showTitleLaunch: z.coerce.boolean()
})
export const ltiIdSchema = baseSchema.pick({ id: true })

// Types for ltis - used to type API request params and within Components
export type Lti = typeof ltis.$inferSelect
export type NewLti = z.infer<typeof insertLtiSchema>
export type NewLtiParams = z.infer<typeof insertLtiParams>
export type UpdateLtiParams = z.infer<typeof updateLtiParams>
export type LtiId = z.infer<typeof ltiIdSchema>['id']

// this type infers the return from getLtis() - meaning it will include any joins
export type CompleteLti = Awaited<ReturnType<typeof getLtis>>['ltis'][number]
