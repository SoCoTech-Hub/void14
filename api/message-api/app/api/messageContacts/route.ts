import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMessageContact,
	deleteMessageContact,
	updateMessageContact
} from '@/lib/api/messageContacts/mutations'
import {
	messageContactIdSchema,
	insertMessageContactParams,
	updateMessageContactParams
} from '@/lib/db/schema/messageContacts'

export async function POST(req: Request) {
	try {
		const validatedData = insertMessageContactParams.parse(await req.json())
		const { messageContact } = await createMessageContact(validatedData)

		revalidatePath('/messageContacts') // optional - assumes you will have named route same as entity

		return NextResponse.json(messageContact, { status: 201 })
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

		const validatedData = updateMessageContactParams.parse(await req.json())
		const validatedParams = messageContactIdSchema.parse({ id })

		const { messageContact } = await updateMessageContact(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(messageContact, { status: 200 })
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

		const validatedParams = messageContactIdSchema.parse({ id })
		const { messageContact } = await deleteMessageContact(validatedParams.id)

		return NextResponse.json(messageContact, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
