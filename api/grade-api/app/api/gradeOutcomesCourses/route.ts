import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradeOutcomesCourse,
	deleteGradeOutcomesCourse,
	updateGradeOutcomesCourse
} from '@/lib/api/gradeOutcomesCourses/mutations'
import {
	gradeOutcomesCourseIdSchema,
	insertGradeOutcomesCourseParams,
	updateGradeOutcomesCourseParams
} from '@/lib/db/schema/gradeOutcomesCourses'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradeOutcomesCourseParams.parse(
			await req.json()
		)
		const { gradeOutcomesCourse } =
			await createGradeOutcomesCourse(validatedData)

		revalidatePath('/gradeOutcomesCourses') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradeOutcomesCourse, { status: 201 })
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

		const validatedData = updateGradeOutcomesCourseParams.parse(
			await req.json()
		)
		const validatedParams = gradeOutcomesCourseIdSchema.parse({ id })

		const { gradeOutcomesCourse } = await updateGradeOutcomesCourse(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradeOutcomesCourse, { status: 200 })
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

		const validatedParams = gradeOutcomesCourseIdSchema.parse({ id })
		const { gradeOutcomesCourse } = await deleteGradeOutcomesCourse(
			validatedParams.id
		)

		return NextResponse.json(gradeOutcomesCourse, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
