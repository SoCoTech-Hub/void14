import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLabel,
	deleteLabel,
	updateLabel
} from '@/lib/api/labels/mutations'
import {
	labelIdSchema,
	insertLabelParams,
	updateLabelParams
} from '@/lib/db/schema/labels'

export async function POST(req: Request) {
	try {
		const validatedData = insertLabelParams.parse(await req.json())
		const { label } = await createLabel(validatedData)

		revalidatePath('/labels') // optional - assumes you will have named route same as entity

		return NextResponse.json(label, { status: 201 })
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

		const validatedData = updateLabelParams.parse(await req.json())
		const validatedParams = labelIdSchema.parse({ id })

		const { label } = await updateLabel(validatedParams.id, validatedData)

		return NextResponse.json(label, { status: 200 })
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

		const validatedParams = labelIdSchema.parse({ id })
		const { label } = await deleteLabel(validatedParams.id)

		return NextResponse.json(label, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
