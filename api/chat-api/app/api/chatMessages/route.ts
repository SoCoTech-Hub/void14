import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createChatMessage,
	deleteChatMessage,
	updateChatMessage
} from '@/lib/api/chatMessages/mutations'
import {
	chatMessageIdSchema,
	insertChatMessageParams,
	updateChatMessageParams
} from '@/lib/db/schema/chatMessages'

export async function POST(req: Request) {
	try {
		const validatedData = insertChatMessageParams.parse(await req.json())
		const { chatMessage } = await createChatMessage(validatedData)

		revalidatePath('/chatMessages') // optional - assumes you will have named route same as entity

		return NextResponse.json(chatMessage, { status: 201 })
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

		const validatedData = updateChatMessageParams.parse(await req.json())
		const validatedParams = chatMessageIdSchema.parse({ id })

		const { chatMessage } = await updateChatMessage(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(chatMessage, { status: 200 })
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

		const validatedParams = chatMessageIdSchema.parse({ id })
		const { chatMessage } = await deleteChatMessage(validatedParams.id)

		return NextResponse.json(chatMessage, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
