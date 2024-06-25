import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionAttemptStepData,
	deleteQuestionAttemptStepData,
	updateQuestionAttemptStepData
} from '@/lib/api/questionAttemptStepDatas/mutations'
import {
	questionAttemptStepDataIdSchema,
	insertQuestionAttemptStepDataParams,
	updateQuestionAttemptStepDataParams
} from '@/lib/db/schema/questionAttemptStepDatas'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionAttemptStepDataParams.parse(
			await req.json()
		)
		const { questionAttemptStepData } =
			await createQuestionAttemptStepData(validatedData)

		revalidatePath('/questionAttemptStepDatas') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionAttemptStepData, { status: 201 })
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

		const validatedData = updateQuestionAttemptStepDataParams.parse(
			await req.json()
		)
		const validatedParams = questionAttemptStepDataIdSchema.parse({ id })

		const { questionAttemptStepData } = await updateQuestionAttemptStepData(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionAttemptStepData, { status: 200 })
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

		const validatedParams = questionAttemptStepDataIdSchema.parse({ id })
		const { questionAttemptStepData } = await deleteQuestionAttemptStepData(
			validatedParams.id
		)

		return NextResponse.json(questionAttemptStepData, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
