import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionAttempt,
	deleteQuestionAttempt,
	updateQuestionAttempt
} from '@soco/question-api/questionAttempts/mutations'
import {
	questionAttemptIdSchema,
	insertQuestionAttemptParams,
	updateQuestionAttemptParams
} from '@soco/question-db/schema/questionAttempts'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionAttemptParams.parse(await req.json())
		const { questionAttempt } = await createQuestionAttempt(validatedData)

		revalidatePath('/questionAttempts') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionAttempt, { status: 201 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json({ error: err }, { status: 500 })
		}
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedData = updateQuestionAttemptParams.parse(await req.json())
		const validatedParams = questionAttemptIdSchema.parse({ id })

		const { questionAttempt } = await updateQuestionAttempt(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionAttempt, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedParams = questionAttemptIdSchema.parse({ id })
		const { questionAttempt } = await deleteQuestionAttempt(validatedParams.id)

		return NextResponse.json(questionAttempt, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}
