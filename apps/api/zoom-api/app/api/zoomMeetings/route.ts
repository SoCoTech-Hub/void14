import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createZoomMeeting,
	deleteZoomMeeting,
	updateZoomMeeting
} from '@/lib/api/zoomMeetings/mutations'
import {
	zoomMeetingIdSchema,
	insertZoomMeetingParams,
	updateZoomMeetingParams
} from '@/lib/db/schema/zoomMeetings'

export async function POST(req: Request) {
	try {
		const validatedData = insertZoomMeetingParams.parse(await req.json())
		const { zoomMeeting } = await createZoomMeeting(validatedData)

		revalidatePath('/zoomMeetings') // optional - assumes you will have named route same as entity

		return NextResponse.json(zoomMeeting, { status: 201 })
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

		const validatedData = updateZoomMeetingParams.parse(await req.json())
		const validatedParams = zoomMeetingIdSchema.parse({ id })

		const { zoomMeeting } = await updateZoomMeeting(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(zoomMeeting, { status: 200 })
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

		const validatedParams = zoomMeetingIdSchema.parse({ id })
		const { zoomMeeting } = await deleteZoomMeeting(validatedParams.id)

		return NextResponse.json(zoomMeeting, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
