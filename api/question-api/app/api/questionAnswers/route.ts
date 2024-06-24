import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionAnswer,
	deleteQuestionAnswer,
	updateQuestionAnswer
} from '@/lib/api/questionAnswers/mutations'
import {
	questionAnswerIdSchema,
	insertQuestionAnswerParams,
	updateQuestionAnswerParams
} from '@/lib/db/schema/questionAnswers'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionAnswerParams.parse(await req.json())
		const { questionAnswer } = await createQuestionAnswer(validatedData)

		revalidatePath('/questionAnswers') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionAnswer, { status: 201 })
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

		const validatedData = updateQuestionAnswerParams.parse(await req.json())
		const validatedParams = questionAnswerIdSchema.parse({ id })

		const { questionAnswer } = await updateQuestionAnswer(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionAnswer, { status: 200 })
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

		const validatedParams = questionAnswerIdSchema.parse({ id })
		const { questionAnswer } = await deleteQuestionAnswer(validatedParams.id)

		return NextResponse.json(questionAnswer, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}
