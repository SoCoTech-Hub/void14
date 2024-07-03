import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAssignFeedbackEditpdfQueue,
	deleteAssignFeedbackEditpdfQueue,
	updateAssignFeedbackEditpdfQueue
} from '@/lib/api/assignFeedbackEditpdfQueues/mutations'
import {
	assignFeedbackEditpdfQueueIdSchema,
	insertAssignFeedbackEditpdfQueueParams,
	updateAssignFeedbackEditpdfQueueParams
} from '@/lib/db/schema/assignFeedbackEditpdfQueues'

export async function POST(req: Request) {
	try {
		const validatedData = insertAssignFeedbackEditpdfQueueParams.parse(
			await req.json()
		)
		const { assignFeedbackEditpdfQueue } =
			await createAssignFeedbackEditpdfQueue(validatedData)

		revalidatePath('/assignFeedbackEditpdfQueues') // optional - assumes you will have named route same as entity

		return NextResponse.json(assignFeedbackEditpdfQueue, { status: 201 })
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

		const validatedData = updateAssignFeedbackEditpdfQueueParams.parse(
			await req.json()
		)
		const validatedParams = assignFeedbackEditpdfQueueIdSchema.parse({ id })

		const { assignFeedbackEditpdfQueue } =
			await updateAssignFeedbackEditpdfQueue(validatedParams.id, validatedData)

		return NextResponse.json(assignFeedbackEditpdfQueue, { status: 200 })
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

		const validatedParams = assignFeedbackEditpdfQueueIdSchema.parse({ id })
		const { assignFeedbackEditpdfQueue } =
			await deleteAssignFeedbackEditpdfQueue(validatedParams.id)

		return NextResponse.json(assignFeedbackEditpdfQueue, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
