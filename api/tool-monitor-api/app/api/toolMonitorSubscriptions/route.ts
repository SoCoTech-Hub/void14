import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createToolMonitorSubscription,
	deleteToolMonitorSubscription,
	updateToolMonitorSubscription
} from '@/lib/api/toolMonitorSubscriptions/mutations'
import {
	toolMonitorSubscriptionIdSchema,
	insertToolMonitorSubscriptionParams,
	updateToolMonitorSubscriptionParams
} from '@/lib/db/schema/toolMonitorSubscriptions'

export async function POST(req: Request) {
	try {
		const validatedData = insertToolMonitorSubscriptionParams.parse(
			await req.json()
		)
		const { toolMonitorSubscription } =
			await createToolMonitorSubscription(validatedData)

		revalidatePath('/toolMonitorSubscriptions') // optional - assumes you will have named route same as entity

		return NextResponse.json(toolMonitorSubscription, { status: 201 })
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

		const validatedData = updateToolMonitorSubscriptionParams.parse(
			await req.json()
		)
		const validatedParams = toolMonitorSubscriptionIdSchema.parse({ id })

		const { toolMonitorSubscription } = await updateToolMonitorSubscription(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(toolMonitorSubscription, { status: 200 })
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

		const validatedParams = toolMonitorSubscriptionIdSchema.parse({ id })
		const { toolMonitorSubscription } = await deleteToolMonitorSubscription(
			validatedParams.id
		)

		return NextResponse.json(toolMonitorSubscription, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
