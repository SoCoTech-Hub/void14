import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createDataContent,
	deleteDataContent,
	updateDataContent
} from '@/lib/api/dataContents/mutations'
import {
	dataContentIdSchema,
	insertDataContentParams,
	updateDataContentParams
} from '@/lib/db/schema/dataContents'

export async function POST(req: Request) {
	try {
		const validatedData = insertDataContentParams.parse(await req.json())
		const { dataContent } = await createDataContent(validatedData)

		revalidatePath('/dataContents') // optional - assumes you will have named route same as entity

		return NextResponse.json(dataContent, { status: 201 })
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

		const validatedData = updateDataContentParams.parse(await req.json())
		const validatedParams = dataContentIdSchema.parse({ id })

		const { dataContent } = await updateDataContent(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(dataContent, { status: 200 })
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

		const validatedParams = dataContentIdSchema.parse({ id })
		const { dataContent } = await deleteDataContent(validatedParams.id)

		return NextResponse.json(dataContent, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
