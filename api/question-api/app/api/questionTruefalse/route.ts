import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionTruefalse,
	deleteQuestionTruefalse,
	updateQuestionTruefalse
} from '@/lib/api/questionTruefalse/mutations'
import {
	questionTruefalseIdSchema,
	insertQuestionTruefalseParams,
	updateQuestionTruefalseParams
} from '@/lib/db/schema/questionTruefalse'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionTruefalseParams.parse(await req.json())
		const { questionTruefalse } = await createQuestionTruefalse(validatedData)

		revalidatePath('/questionTruefalse') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionTruefalse, { status: 201 })
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

		const validatedData = updateQuestionTruefalseParams.parse(await req.json())
		const validatedParams = questionTruefalseIdSchema.parse({ id })

		const { questionTruefalse } = await updateQuestionTruefalse(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionTruefalse, { status: 200 })
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

		const validatedParams = questionTruefalseIdSchema.parse({ id })
		const { questionTruefalse } = await deleteQuestionTruefalse(
			validatedParams.id
		)

		return NextResponse.json(questionTruefalse, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
