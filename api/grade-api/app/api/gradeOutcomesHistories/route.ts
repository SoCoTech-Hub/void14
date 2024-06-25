import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradeOutcomesHistory,
	deleteGradeOutcomesHistory,
	updateGradeOutcomesHistory
} from '@/lib/api/gradeOutcomesHistories/mutations'
import {
	gradeOutcomesHistoryIdSchema,
	insertGradeOutcomesHistoryParams,
	updateGradeOutcomesHistoryParams
} from '@/lib/db/schema/gradeOutcomesHistories'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradeOutcomesHistoryParams.parse(
			await req.json()
		)
		const { gradeOutcomesHistory } =
			await createGradeOutcomesHistory(validatedData)

		revalidatePath('/gradeOutcomesHistories') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradeOutcomesHistory, { status: 201 })
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

		const validatedData = updateGradeOutcomesHistoryParams.parse(
			await req.json()
		)
		const validatedParams = gradeOutcomesHistoryIdSchema.parse({ id })

		const { gradeOutcomesHistory } = await updateGradeOutcomesHistory(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradeOutcomesHistory, { status: 200 })
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

		const validatedParams = gradeOutcomesHistoryIdSchema.parse({ id })
		const { gradeOutcomesHistory } = await deleteGradeOutcomesHistory(
			validatedParams.id
		)

		return NextResponse.json(gradeOutcomesHistory, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
