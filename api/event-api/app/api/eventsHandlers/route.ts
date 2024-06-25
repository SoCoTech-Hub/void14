import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEventsHandler,
	deleteEventsHandler,
	updateEventsHandler
} from '@/lib/api/eventsHandlers/mutations'
import {
	eventsHandlerIdSchema,
	insertEventsHandlerParams,
	updateEventsHandlerParams
} from '@/lib/db/schema/eventsHandlers'

export async function POST(req: Request) {
	try {
		const validatedData = insertEventsHandlerParams.parse(await req.json())
		const { eventsHandler } = await createEventsHandler(validatedData)

		revalidatePath('/eventsHandlers') // optional - assumes you will have named route same as entity

		return NextResponse.json(eventsHandler, { status: 201 })
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

		const validatedData = updateEventsHandlerParams.parse(await req.json())
		const validatedParams = eventsHandlerIdSchema.parse({ id })

		const { eventsHandler } = await updateEventsHandler(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(eventsHandler, { status: 200 })
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

		const validatedParams = eventsHandlerIdSchema.parse({ id })
		const { eventsHandler } = await deleteEventsHandler(validatedParams.id)

		return NextResponse.json(eventsHandler, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
