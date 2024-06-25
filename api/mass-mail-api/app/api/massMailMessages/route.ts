import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMassMailMessage,
	deleteMassMailMessage,
	updateMassMailMessage
} from '@/lib/api/massMailMessages/mutations'
import {
	massMailMessageIdSchema,
	insertMassMailMessageParams,
	updateMassMailMessageParams
} from '@/lib/db/schema/massMailMessages'

export async function POST(req: Request) {
	try {
		const validatedData = insertMassMailMessageParams.parse(await req.json())
		const { massMailMessage } = await createMassMailMessage(validatedData)

		revalidatePath('/massMailMessages') // optional - assumes you will have named route same as entity

		return NextResponse.json(massMailMessage, { status: 201 })
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

		const validatedData = updateMassMailMessageParams.parse(await req.json())
		const validatedParams = massMailMessageIdSchema.parse({ id })

		const { massMailMessage } = await updateMassMailMessage(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(massMailMessage, { status: 200 })
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

		const validatedParams = massMailMessageIdSchema.parse({ id })
		const { massMailMessage } = await deleteMassMailMessage(validatedParams.id)

		return NextResponse.json(massMailMessage, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
