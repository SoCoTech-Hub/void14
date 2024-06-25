import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradeGrade,
	deleteGradeGrade,
	updateGradeGrade
} from '@/lib/api/gradeGrades/mutations'
import {
	gradeGradeIdSchema,
	insertGradeGradeParams,
	updateGradeGradeParams
} from '@/lib/db/schema/gradeGrades'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradeGradeParams.parse(await req.json())
		const { gradeGrade } = await createGradeGrade(validatedData)

		revalidatePath('/gradeGrades') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradeGrade, { status: 201 })
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

		const validatedData = updateGradeGradeParams.parse(await req.json())
		const validatedParams = gradeGradeIdSchema.parse({ id })

		const { gradeGrade } = await updateGradeGrade(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradeGrade, { status: 200 })
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

		const validatedParams = gradeGradeIdSchema.parse({ id })
		const { gradeGrade } = await deleteGradeGrade(validatedParams.id)

		return NextResponse.json(gradeGrade, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
