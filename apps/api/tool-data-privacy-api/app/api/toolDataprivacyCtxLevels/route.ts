import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createToolDataprivacyCtxLevel,
	deleteToolDataprivacyCtxLevel,
	updateToolDataprivacyCtxLevel
} from '@/lib/api/toolDataprivacyCtxLevels/mutations'
import {
	toolDataprivacyCtxLevelIdSchema,
	insertToolDataprivacyCtxLevelParams,
	updateToolDataprivacyCtxLevelParams
} from '@/lib/db/schema/toolDataprivacyCtxLevels'

export async function POST(req: Request) {
	try {
		const validatedData = insertToolDataprivacyCtxLevelParams.parse(
			await req.json()
		)
		const { toolDataprivacyCtxLevel } =
			await createToolDataprivacyCtxLevel(validatedData)

		revalidatePath('/toolDataprivacyCtxLevels') // optional - assumes you will have named route same as entity

		return NextResponse.json(toolDataprivacyCtxLevel, { status: 201 })
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

		const validatedData = updateToolDataprivacyCtxLevelParams.parse(
			await req.json()
		)
		const validatedParams = toolDataprivacyCtxLevelIdSchema.parse({ id })

		const { toolDataprivacyCtxLevel } = await updateToolDataprivacyCtxLevel(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(toolDataprivacyCtxLevel, { status: 200 })
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

		const validatedParams = toolDataprivacyCtxLevelIdSchema.parse({ id })
		const { toolDataprivacyCtxLevel } = await deleteToolDataprivacyCtxLevel(
			validatedParams.id
		)

		return NextResponse.json(toolDataprivacyCtxLevel, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
