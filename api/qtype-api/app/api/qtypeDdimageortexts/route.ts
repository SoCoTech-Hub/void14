import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQtypeDdimageortext,
	deleteQtypeDdimageortext,
	updateQtypeDdimageortext
} from '@/lib/api/qtypeDdimageortexts/mutations'
import {
	qtypeDdimageortextIdSchema,
	insertQtypeDdimageortextParams,
	updateQtypeDdimageortextParams
} from '@/lib/db/schema/qtypeDdimageortexts'

export async function POST(req: Request) {
	try {
		const validatedData = insertQtypeDdimageortextParams.parse(await req.json())
		const { qtypeDdimageortext } = await createQtypeDdimageortext(validatedData)

		revalidatePath('/qtypeDdimageortexts') // optional - assumes you will have named route same as entity

		return NextResponse.json(qtypeDdimageortext, { status: 201 })
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

		const validatedData = updateQtypeDdimageortextParams.parse(await req.json())
		const validatedParams = qtypeDdimageortextIdSchema.parse({ id })

		const { qtypeDdimageortext } = await updateQtypeDdimageortext(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(qtypeDdimageortext, { status: 200 })
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

		const validatedParams = qtypeDdimageortextIdSchema.parse({ id })
		const { qtypeDdimageortext } = await deleteQtypeDdimageortext(
			validatedParams.id
		)

		return NextResponse.json(qtypeDdimageortext, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
