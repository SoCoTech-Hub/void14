import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createToolMonitorEvent,
	deleteToolMonitorEvent,
	updateToolMonitorEvent
} from '@/lib/api/toolMonitorEvents/mutations'
import {
	toolMonitorEventIdSchema,
	insertToolMonitorEventParams,
	updateToolMonitorEventParams
} from '@/lib/db/schema/toolMonitorEvents'

export async function POST(req: Request) {
	try {
		const validatedData = insertToolMonitorEventParams.parse(await req.json())
		const { toolMonitorEvent } = await createToolMonitorEvent(validatedData)

		revalidatePath('/toolMonitorEvents') // optional - assumes you will have named route same as entity

		return NextResponse.json(toolMonitorEvent, { status: 201 })
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

		const validatedData = updateToolMonitorEventParams.parse(await req.json())
		const validatedParams = toolMonitorEventIdSchema.parse({ id })

		const { toolMonitorEvent } = await updateToolMonitorEvent(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(toolMonitorEvent, { status: 200 })
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

		const validatedParams = toolMonitorEventIdSchema.parse({ id })
		const { toolMonitorEvent } = await deleteToolMonitorEvent(
			validatedParams.id
		)

		return NextResponse.json(toolMonitorEvent, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
