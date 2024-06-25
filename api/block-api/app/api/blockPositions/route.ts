import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBlockPosition,
	deleteBlockPosition,
	updateBlockPosition
} from '@/lib/api/blockPositions/mutations'
import {
	blockPositionIdSchema,
	insertBlockPositionParams,
	updateBlockPositionParams
} from '@/lib/db/schema/blockPositions'

export async function POST(req: Request) {
	try {
		const validatedData = insertBlockPositionParams.parse(await req.json())
		const { blockPosition } = await createBlockPosition(validatedData)

		revalidatePath('/blockPositions') // optional - assumes you will have named route same as entity

		return NextResponse.json(blockPosition, { status: 201 })
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

		const validatedData = updateBlockPositionParams.parse(await req.json())
		const validatedParams = blockPositionIdSchema.parse({ id })

		const { blockPosition } = await updateBlockPosition(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(blockPosition, { status: 200 })
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

		const validatedParams = blockPositionIdSchema.parse({ id })
		const { blockPosition } = await deleteBlockPosition(validatedParams.id)

		return NextResponse.json(blockPosition, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
