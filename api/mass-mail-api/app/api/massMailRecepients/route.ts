import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMassMailRecipient,
	deleteMassMailRecipient,
	updateMassMailRecipient
} from '@/lib/api/massMailRecipients/mutations'
import {
	massMailRecipientIdSchema,
	insertMassMailRecipientParams,
	updateMassMailRecipientParams
} from '@/lib/db/schema/massMailRecipients'

export async function POST(req: Request) {
	try {
		const validatedData = insertMassMailRecipientParams.parse(await req.json())
		const { massMailRecipient } = await createMassMailRecipient(validatedData)

		revalidatePath('/massMailRecipients') // optional - assumes you will have named route same as entity

		return NextResponse.json(massMailRecipient, { status: 201 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json({ error: err }, { status: 500 })
		}
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedData = updateMassMailRecipientParams.parse(await req.json())
		const validatedParams = massMailRecipientIdSchema.parse({ id })

		const { massMailRecipient } = await updateMassMailRecipient(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(massMailRecipient, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedParams = massMailRecipientIdSchema.parse({ id })
		const { massMailRecipient } = await deleteMassMailRecipient(
			validatedParams.id
		)

		return NextResponse.json(massMailRecipient, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}
