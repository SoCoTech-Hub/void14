import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createChoiceAnswer,
	deleteChoiceAnswer,
	updateChoiceAnswer
} from '@/lib/api/choiceAnswers/mutations'
import {
	choiceAnswerIdSchema,
	insertChoiceAnswerParams,
	updateChoiceAnswerParams
} from '@/lib/db/schema/choiceAnswers'

export async function POST(req: Request) {
	try {
		const validatedData = insertChoiceAnswerParams.parse(await req.json())
		const { choiceAnswer } = await createChoiceAnswer(validatedData)

		revalidatePath('/choiceAnswers') // optional - assumes you will have named route same as entity

		return NextResponse.json(choiceAnswer, { status: 201 })
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

		const validatedData = updateChoiceAnswerParams.parse(await req.json())
		const validatedParams = choiceAnswerIdSchema.parse({ id })

		const { choiceAnswer } = await updateChoiceAnswer(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(choiceAnswer, { status: 200 })
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

		const validatedParams = choiceAnswerIdSchema.parse({ id })
		const { choiceAnswer } = await deleteChoiceAnswer(validatedParams.id)

		return NextResponse.json(choiceAnswer, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
