import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradeImportNewitem,
	deleteGradeImportNewitem,
	updateGradeImportNewitem
} from '@/lib/api/gradeImportNewitems/mutations'
import {
	gradeImportNewitemIdSchema,
	insertGradeImportNewitemParams,
	updateGradeImportNewitemParams
} from '@/lib/db/schema/gradeImportNewitems'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradeImportNewitemParams.parse(await req.json())
		const { gradeImportNewitem } = await createGradeImportNewitem(validatedData)

		revalidatePath('/gradeImportNewitems') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradeImportNewitem, { status: 201 })
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

		const validatedData = updateGradeImportNewitemParams.parse(await req.json())
		const validatedParams = gradeImportNewitemIdSchema.parse({ id })

		const { gradeImportNewitem } = await updateGradeImportNewitem(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradeImportNewitem, { status: 200 })
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

		const validatedParams = gradeImportNewitemIdSchema.parse({ id })
		const { gradeImportNewitem } = await deleteGradeImportNewitem(
			validatedParams.id
		)

		return NextResponse.json(gradeImportNewitem, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
