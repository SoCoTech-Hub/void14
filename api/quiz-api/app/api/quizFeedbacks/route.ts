import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuizFeedback,
	deleteQuizFeedback,
	updateQuizFeedback
} from '@/lib/api/quizFeedbacks/mutations'
import {
	quizFeedbackIdSchema,
	insertQuizFeedbackParams,
	updateQuizFeedbackParams
} from '@/lib/db/schema/quizFeedbacks'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuizFeedbackParams.parse(await req.json())
		const { quizFeedback } = await createQuizFeedback(validatedData)

		revalidatePath('/quizFeedbacks') // optional - assumes you will have named route same as entity

		return NextResponse.json(quizFeedback, { status: 201 })
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

		const validatedData = updateQuizFeedbackParams.parse(await req.json())
		const validatedParams = quizFeedbackIdSchema.parse({ id })

		const { quizFeedback } = await updateQuizFeedback(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(quizFeedback, { status: 200 })
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

		const validatedParams = quizFeedbackIdSchema.parse({ id })
		const { quizFeedback } = await deleteQuizFeedback(validatedParams.id)

		return NextResponse.json(quizFeedback, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
