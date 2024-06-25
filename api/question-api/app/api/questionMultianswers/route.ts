import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionMultianswer,
	deleteQuestionMultianswer,
	updateQuestionMultianswer
} from '@/lib/api/questionMultianswers/mutations'
import {
	questionMultianswerIdSchema,
	insertQuestionMultianswerParams,
	updateQuestionMultianswerParams
} from '@/lib/db/schema/questionMultianswers'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionMultianswerParams.parse(
			await req.json()
		)
		const { questionMultianswer } =
			await createQuestionMultianswer(validatedData)

		revalidatePath('/questionMultianswers') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionMultianswer, { status: 201 })
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

		const validatedData = updateQuestionMultianswerParams.parse(
			await req.json()
		)
		const validatedParams = questionMultianswerIdSchema.parse({ id })

		const { questionMultianswer } = await updateQuestionMultianswer(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionMultianswer, { status: 200 })
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

		const validatedParams = questionMultianswerIdSchema.parse({ id })
		const { questionMultianswer } = await deleteQuestionMultianswer(
			validatedParams.id
		)

		return NextResponse.json(questionMultianswer, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
