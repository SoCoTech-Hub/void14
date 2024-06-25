import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createWorkshopFormAccumulative,
	deleteWorkshopFormAccumulative,
	updateWorkshopFormAccumulative
} from '@/lib/api/workshopFormAccumulatives/mutations'
import {
	workshopFormAccumulativeIdSchema,
	insertWorkshopFormAccumulativeParams,
	updateWorkshopFormAccumulativeParams
} from '@/lib/db/schema/workshopFormAccumulatives'

export async function POST(req: Request) {
	try {
		const validatedData = insertWorkshopFormAccumulativeParams.parse(
			await req.json()
		)
		const { workshopFormAccumulative } =
			await createWorkshopFormAccumulative(validatedData)

		revalidatePath('/workshopFormAccumulatives') // optional - assumes you will have named route same as entity

		return NextResponse.json(workshopFormAccumulative, { status: 201 })
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

		const validatedData = updateWorkshopFormAccumulativeParams.parse(
			await req.json()
		)
		const validatedParams = workshopFormAccumulativeIdSchema.parse({ id })

		const { workshopFormAccumulative } = await updateWorkshopFormAccumulative(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(workshopFormAccumulative, { status: 200 })
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

		const validatedParams = workshopFormAccumulativeIdSchema.parse({ id })
		const { workshopFormAccumulative } = await deleteWorkshopFormAccumulative(
			validatedParams.id
		)

		return NextResponse.json(workshopFormAccumulative, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
