import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createWorkshop,
	deleteWorkshop,
	updateWorkshop
} from '@/lib/api/workshops/mutations'
import {
	workshopIdSchema,
	insertWorkshopParams,
	updateWorkshopParams
} from '@/lib/db/schema/workshops'

export async function POST(req: Request) {
	try {
		const validatedData = insertWorkshopParams.parse(await req.json())
		const { workshop } = await createWorkshop(validatedData)

		revalidatePath('/workshops') // optional - assumes you will have named route same as entity

		return NextResponse.json(workshop, { status: 201 })
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

		const validatedData = updateWorkshopParams.parse(await req.json())
		const validatedParams = workshopIdSchema.parse({ id })

		const { workshop } = await updateWorkshop(validatedParams.id, validatedData)

		return NextResponse.json(workshop, { status: 200 })
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

		const validatedParams = workshopIdSchema.parse({ id })
		const { workshop } = await deleteWorkshop(validatedParams.id)

		return NextResponse.json(workshop, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
