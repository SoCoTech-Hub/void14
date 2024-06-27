import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createToolDataprivacyPurpose,
	deleteToolDataprivacyPurpose,
	updateToolDataprivacyPurpose
} from '@/lib/api/toolDataprivacyPurposes/mutations'
import {
	toolDataprivacyPurposeIdSchema,
	insertToolDataprivacyPurposeParams,
	updateToolDataprivacyPurposeParams
} from '@/lib/db/schema/toolDataprivacyPurposes'

export async function POST(req: Request) {
	try {
		const validatedData = insertToolDataprivacyPurposeParams.parse(
			await req.json()
		)
		const { toolDataprivacyPurpose } =
			await createToolDataprivacyPurpose(validatedData)

		revalidatePath('/toolDataprivacyPurposes') // optional - assumes you will have named route same as entity

		return NextResponse.json(toolDataprivacyPurpose, { status: 201 })
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

		const validatedData = updateToolDataprivacyPurposeParams.parse(
			await req.json()
		)
		const validatedParams = toolDataprivacyPurposeIdSchema.parse({ id })

		const { toolDataprivacyPurpose } = await updateToolDataprivacyPurpose(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(toolDataprivacyPurpose, { status: 200 })
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

		const validatedParams = toolDataprivacyPurposeIdSchema.parse({ id })
		const { toolDataprivacyPurpose } = await deleteToolDataprivacyPurpose(
			validatedParams.id
		)

		return NextResponse.json(toolDataprivacyPurpose, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
