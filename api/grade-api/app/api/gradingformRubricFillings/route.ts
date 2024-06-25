import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradingformRubricFilling,
	deleteGradingformRubricFilling,
	updateGradingformRubricFilling
} from '@/lib/api/gradingformRubricFillings/mutations'
import {
	gradingformRubricFillingIdSchema,
	insertGradingformRubricFillingParams,
	updateGradingformRubricFillingParams
} from '@/lib/db/schema/gradingformRubricFillings'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradingformRubricFillingParams.parse(
			await req.json()
		)
		const { gradingformRubricFilling } =
			await createGradingformRubricFilling(validatedData)

		revalidatePath('/gradingformRubricFillings') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradingformRubricFilling, { status: 201 })
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

		const validatedData = updateGradingformRubricFillingParams.parse(
			await req.json()
		)
		const validatedParams = gradingformRubricFillingIdSchema.parse({ id })

		const { gradingformRubricFilling } = await updateGradingformRubricFilling(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradingformRubricFilling, { status: 200 })
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

		const validatedParams = gradingformRubricFillingIdSchema.parse({ id })
		const { gradingformRubricFilling } = await deleteGradingformRubricFilling(
			validatedParams.id
		)

		return NextResponse.json(gradingformRubricFilling, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
