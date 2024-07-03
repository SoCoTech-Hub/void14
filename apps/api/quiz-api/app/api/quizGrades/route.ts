import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuizGrade,
	deleteQuizGrade,
	updateQuizGrade
} from '@/lib/api/quizGrades/mutations'
import {
	quizGradeIdSchema,
	insertQuizGradeParams,
	updateQuizGradeParams
} from '@/lib/db/schema/quizGrades'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuizGradeParams.parse(await req.json())
		const { quizGrade } = await createQuizGrade(validatedData)

		revalidatePath('/quizGrades') // optional - assumes you will have named route same as entity

		return NextResponse.json(quizGrade, { status: 201 })
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

		const validatedData = updateQuizGradeParams.parse(await req.json())
		const validatedParams = quizGradeIdSchema.parse({ id })

		const { quizGrade } = await updateQuizGrade(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(quizGrade, { status: 200 })
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

		const validatedParams = quizGradeIdSchema.parse({ id })
		const { quizGrade } = await deleteQuizGrade(validatedParams.id)

		return NextResponse.json(quizGrade, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
