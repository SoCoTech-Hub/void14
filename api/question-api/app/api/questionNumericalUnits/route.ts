import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuestionNumericalUnit,
	deleteQuestionNumericalUnit,
	updateQuestionNumericalUnit
} from '@/lib/api/questionNumericalUnits/mutations'
import {
	questionNumericalUnitIdSchema,
	insertQuestionNumericalUnitParams,
	updateQuestionNumericalUnitParams
} from '@/lib/db/schema/questionNumericalUnits'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuestionNumericalUnitParams.parse(
			await req.json()
		)
		const { questionNumericalUnit } =
			await createQuestionNumericalUnit(validatedData)

		revalidatePath('/questionNumericalUnits') // optional - assumes you will have named route same as entity

		return NextResponse.json(questionNumericalUnit, { status: 201 })
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

		const validatedData = updateQuestionNumericalUnitParams.parse(
			await req.json()
		)
		const validatedParams = questionNumericalUnitIdSchema.parse({ id })

		const { questionNumericalUnit } = await updateQuestionNumericalUnit(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(questionNumericalUnit, { status: 200 })
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

		const validatedParams = questionNumericalUnitIdSchema.parse({ id })
		const { questionNumericalUnit } = await deleteQuestionNumericalUnit(
			validatedParams.id
		)

		return NextResponse.json(questionNumericalUnit, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
