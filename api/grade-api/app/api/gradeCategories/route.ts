import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradeCategory,
	deleteGradeCategory,
	updateGradeCategory
} from '@/lib/api/gradeCategories/mutations'
import {
	gradeCategoryIdSchema,
	insertGradeCategoryParams,
	updateGradeCategoryParams
} from '@/lib/db/schema/gradeCategories'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradeCategoryParams.parse(await req.json())
		const { gradeCategory } = await createGradeCategory(validatedData)

		revalidatePath('/gradeCategories') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradeCategory, { status: 201 })
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

		const validatedData = updateGradeCategoryParams.parse(await req.json())
		const validatedParams = gradeCategoryIdSchema.parse({ id })

		const { gradeCategory } = await updateGradeCategory(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradeCategory, { status: 200 })
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

		const validatedParams = gradeCategoryIdSchema.parse({ id })
		const { gradeCategory } = await deleteGradeCategory(validatedParams.id)

		return NextResponse.json(gradeCategory, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
