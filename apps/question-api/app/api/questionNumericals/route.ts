import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionNumerical,
	deleteQuestionNumerical,
	updateQuestionNumerical
} from '@/lib/api/questionNumericals/mutations'
import {
	questionNumericalIdSchema,
	insertQuestionNumericalParams,
	updateQuestionNumericalParams
} from '@/lib/db/schema/questionNumericals'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionNumericalParams.parse(await req.json())
		const { questionNumerical } = await createQuestionNumerical(validatedData)

		revalidatePath('/questionNumericals') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionNumerical, { status: 201 })
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

		const validatedData = updateQuestionNumericalParams.parse(await req.json())
		const validatedParams = questionNumericalIdSchema.parse({ id })

		const { questionNumerical } = await updateQuestionNumerical(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionNumerical, { status: 200 })
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

		const validatedParams = questionNumericalIdSchema.parse({ id })
		const { questionNumerical } = await deleteQuestionNumerical(
			validatedParams.id
		)

		return NextResponse.json(questionNumerical, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
