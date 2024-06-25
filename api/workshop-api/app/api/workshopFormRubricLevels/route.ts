import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createWorkshopFormRubricLevel,
	deleteWorkshopFormRubricLevel,
	updateWorkshopFormRubricLevel
} from '@/lib/api/workshopFormRubricLevels/mutations'
import {
	workshopFormRubricLevelIdSchema,
	insertWorkshopFormRubricLevelParams,
	updateWorkshopFormRubricLevelParams
} from '@/lib/db/schema/workshopFormRubricLevels'

export async function POST(req: Request) {
	try {
		const validatedData = insertWorkshopFormRubricLevelParams.parse(
			await req.json()
		)
		const { workshopFormRubricLevel } =
			await createWorkshopFormRubricLevel(validatedData)

		revalidatePath('/workshopFormRubricLevels') // optional - assumes you will have named route same as entity

		return NextResponse.json(workshopFormRubricLevel, { status: 201 })
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

		const validatedData = updateWorkshopFormRubricLevelParams.parse(
			await req.json()
		)
		const validatedParams = workshopFormRubricLevelIdSchema.parse({ id })

		const { workshopFormRubricLevel } = await updateWorkshopFormRubricLevel(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(workshopFormRubricLevel, { status: 200 })
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

		const validatedParams = workshopFormRubricLevelIdSchema.parse({ id })
		const { workshopFormRubricLevel } = await deleteWorkshopFormRubricLevel(
			validatedParams.id
		)

		return NextResponse.json(workshopFormRubricLevel, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
