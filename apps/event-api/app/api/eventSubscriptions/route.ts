import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEventSubscription,
	deleteEventSubscription,
	updateEventSubscription
} from '@/lib/api/eventSubscriptions/mutations'
import {
	eventSubscriptionIdSchema,
	insertEventSubscriptionParams,
	updateEventSubscriptionParams
} from '@/lib/db/schema/eventSubscriptions'

export async function POST(req: Request) {
	try {
		const validatedData = insertEventSubscriptionParams.parse(await req.json())
		const { eventSubscription } = await createEventSubscription(validatedData)

		revalidatePath('/eventSubscriptions') // optional - assumes you will have named route same as entity

		return NextResponse.json(eventSubscription, { status: 201 })
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

		const validatedData = updateEventSubscriptionParams.parse(await req.json())
		const validatedParams = eventSubscriptionIdSchema.parse({ id })

		const { eventSubscription } = await updateEventSubscription(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(eventSubscription, { status: 200 })
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

		const validatedParams = eventSubscriptionIdSchema.parse({ id })
		const { eventSubscription } = await deleteEventSubscription(
			validatedParams.id
		)

		return NextResponse.json(eventSubscription, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
