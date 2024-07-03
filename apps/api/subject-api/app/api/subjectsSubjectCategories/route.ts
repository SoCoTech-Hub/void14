import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createSubjectsSubjectCategory,
	deleteSubjectsSubjectCategory,
	updateSubjectsSubjectCategory
} from '@/lib/api/subjectsSubjectCategories/mutations'
import {
	subjectsSubjectCategoryIdSchema,
	insertSubjectsSubjectCategoryParams,
	updateSubjectsSubjectCategoryParams
} from '@/lib/db/schema/subjectsSubjectCategories'

export async function POST(req: Request) {
	try {
		const validatedData = insertSubjectsSubjectCategoryParams.parse(
			await req.json()
		)
		const { subjectsSubjectCategory } =
			await createSubjectsSubjectCategory(validatedData)

		revalidatePath('/subjectsSubjectCategories') // optional - assumes you will have named route same as entity

		return NextResponse.json(subjectsSubjectCategory, { status: 201 })
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

		const validatedData = updateSubjectsSubjectCategoryParams.parse(
			await req.json()
		)
		const validatedParams = subjectsSubjectCategoryIdSchema.parse({ id })

		const { subjectsSubjectCategory } = await updateSubjectsSubjectCategory(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(subjectsSubjectCategory, { status: 200 })
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

		const validatedParams = subjectsSubjectCategoryIdSchema.parse({ id })
		const { subjectsSubjectCategory } = await deleteSubjectsSubjectCategory(
			validatedParams.id
		)

		return NextResponse.json(subjectsSubjectCategory, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
