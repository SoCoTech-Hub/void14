import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createFeedbackTemplate,
	deleteFeedbackTemplate,
	updateFeedbackTemplate
} from '@/lib/api/feedbackTemplates/mutations'
import {
	feedbackTemplateIdSchema,
	insertFeedbackTemplateParams,
	updateFeedbackTemplateParams
} from '@/lib/db/schema/feedbackTemplates'

export async function POST(req: Request) {
	try {
		const validatedData = insertFeedbackTemplateParams.parse(await req.json())
		const { feedbackTemplate } = await createFeedbackTemplate(validatedData)

		revalidatePath('/feedbackTemplates') // optional - assumes you will have named route same as entity

		return NextResponse.json(feedbackTemplate, { status: 201 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json({ error: err }, { status: 500 })
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedData = updateFeedbackTemplateParams.parse(await req.json())
		const validatedParams = feedbackTemplateIdSchema.parse({ id })

		const { feedbackTemplate } = await updateFeedbackTemplate(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(feedbackTemplate, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedParams = feedbackTemplateIdSchema.parse({ id })
		const { feedbackTemplate } = await deleteFeedbackTemplate(
			validatedParams.id
		)

		return NextResponse.json(feedbackTemplate, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
