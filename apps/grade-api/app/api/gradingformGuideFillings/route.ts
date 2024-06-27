import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradingformGuideFilling,
	deleteGradingformGuideFilling,
	updateGradingformGuideFilling
} from '@/lib/api/gradingformGuideFillings/mutations'
import {
	gradingformGuideFillingIdSchema,
	insertGradingformGuideFillingParams,
	updateGradingformGuideFillingParams
} from '@/lib/db/schema/gradingformGuideFillings'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradingformGuideFillingParams.parse(
			await req.json()
		)
		const { gradingformGuideFilling } =
			await createGradingformGuideFilling(validatedData)

		revalidatePath('/gradingformGuideFillings') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradingformGuideFilling, { status: 201 })
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

		const validatedData = updateGradingformGuideFillingParams.parse(
			await req.json()
		)
		const validatedParams = gradingformGuideFillingIdSchema.parse({ id })

		const { gradingformGuideFilling } = await updateGradingformGuideFilling(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradingformGuideFilling, { status: 200 })
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

		const validatedParams = gradingformGuideFillingIdSchema.parse({ id })
		const { gradingformGuideFilling } = await deleteGradingformGuideFilling(
			validatedParams.id
		)

		return NextResponse.json(gradingformGuideFilling, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
