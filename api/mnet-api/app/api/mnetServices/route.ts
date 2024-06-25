import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMnetService,
	deleteMnetService,
	updateMnetService
} from '@/lib/api/mnetServices/mutations'
import {
	mnetServiceIdSchema,
	insertMnetServiceParams,
	updateMnetServiceParams
} from '@/lib/db/schema/mnetServices'

export async function POST(req: Request) {
	try {
		const validatedData = insertMnetServiceParams.parse(await req.json())
		const { mnetService } = await createMnetService(validatedData)

		revalidatePath('/mnetServices') // optional - assumes you will have named route same as entity

		return NextResponse.json(mnetService, { status: 201 })
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

		const validatedData = updateMnetServiceParams.parse(await req.json())
		const validatedParams = mnetServiceIdSchema.parse({ id })

		const { mnetService } = await updateMnetService(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(mnetService, { status: 200 })
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

		const validatedParams = mnetServiceIdSchema.parse({ id })
		const { mnetService } = await deleteMnetService(validatedParams.id)

		return NextResponse.json(mnetService, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
