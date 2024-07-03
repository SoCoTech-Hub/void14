import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGlossaryCategory,
	deleteGlossaryCategory,
	updateGlossaryCategory
} from '@/lib/api/glossaryCategories/mutations'
import {
	glossaryCategoryIdSchema,
	insertGlossaryCategoryParams,
	updateGlossaryCategoryParams
} from '@/lib/db/schema/glossaryCategories'

export async function POST(req: Request) {
	try {
		const validatedData = insertGlossaryCategoryParams.parse(await req.json())
		const { glossaryCategory } = await createGlossaryCategory(validatedData)

		revalidatePath('/glossaryCategories') // optional - assumes you will have named route same as entity

		return NextResponse.json(glossaryCategory, { status: 201 })
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

		const validatedData = updateGlossaryCategoryParams.parse(await req.json())
		const validatedParams = glossaryCategoryIdSchema.parse({ id })

		const { glossaryCategory } = await updateGlossaryCategory(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(glossaryCategory, { status: 200 })
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

		const validatedParams = glossaryCategoryIdSchema.parse({ id })
		const { glossaryCategory } = await deleteGlossaryCategory(
			validatedParams.id
		)

		return NextResponse.json(glossaryCategory, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
