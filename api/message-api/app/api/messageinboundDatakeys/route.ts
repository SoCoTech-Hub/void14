import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMessageinboundDatakey,
	deleteMessageinboundDatakey,
	updateMessageinboundDatakey
} from '@/lib/api/messageinboundDatakeys/mutations'
import {
	messageinboundDatakeyIdSchema,
	insertMessageinboundDatakeyParams,
	updateMessageinboundDatakeyParams
} from '@/lib/db/schema/messageinboundDatakeys'

export async function POST(req: Request) {
	try {
		const validatedData = insertMessageinboundDatakeyParams.parse(
			await req.json()
		)
		const { messageinboundDatakey } =
			await createMessageinboundDatakey(validatedData)

		revalidatePath('/messageinboundDatakeys') // optional - assumes you will have named route same as entity

		return NextResponse.json(messageinboundDatakey, { status: 201 })
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

		const validatedData = updateMessageinboundDatakeyParams.parse(
			await req.json()
		)
		const validatedParams = messageinboundDatakeyIdSchema.parse({ id })

		const { messageinboundDatakey } = await updateMessageinboundDatakey(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(messageinboundDatakey, { status: 200 })
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

		const validatedParams = messageinboundDatakeyIdSchema.parse({ id })
		const { messageinboundDatakey } = await deleteMessageinboundDatakey(
			validatedParams.id
		)

		return NextResponse.json(messageinboundDatakey, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
