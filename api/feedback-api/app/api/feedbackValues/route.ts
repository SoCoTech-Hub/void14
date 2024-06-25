import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createFeedbackValue,
	deleteFeedbackValue,
	updateFeedbackValue
} from '@/lib/api/feedbackValues/mutations'
import {
	feedbackValueIdSchema,
	insertFeedbackValueParams,
	updateFeedbackValueParams
} from '@/lib/db/schema/feedbackValues'

export async function POST(req: Request) {
	try {
		const validatedData = insertFeedbackValueParams.parse(await req.json())
		const { feedbackValue } = await createFeedbackValue(validatedData)

		revalidatePath('/feedbackValues') // optional - assumes you will have named route same as entity

		return NextResponse.json(feedbackValue, { status: 201 })
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

		const validatedData = updateFeedbackValueParams.parse(await req.json())
		const validatedParams = feedbackValueIdSchema.parse({ id })

		const { feedbackValue } = await updateFeedbackValue(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(feedbackValue, { status: 200 })
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

		const validatedParams = feedbackValueIdSchema.parse({ id })
		const { feedbackValue } = await deleteFeedbackValue(validatedParams.id)

		return NextResponse.json(feedbackValue, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
