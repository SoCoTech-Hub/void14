import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBigBlueButtonBnRecording,
	deleteBigBlueButtonBnRecording,
	updateBigBlueButtonBnRecording
} from '@/lib/api/bigBlueButtonBnRecordings/mutations'
import {
	bigBlueButtonBnRecordingIdSchema,
	insertBigBlueButtonBnRecordingParams,
	updateBigBlueButtonBnRecordingParams
} from '@/lib/db/schema/bigBlueButtonBnRecordings'

export async function POST(req: Request) {
	try {
		const validatedData = insertBigBlueButtonBnRecordingParams.parse(
			await req.json()
		)
		const { bigBlueButtonBnRecording } =
			await createBigBlueButtonBnRecording(validatedData)

		revalidatePath('/bigBlueButtonBnRecordings') // optional - assumes you will have named route same as entity

		return NextResponse.json(bigBlueButtonBnRecording, { status: 201 })
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

		const validatedData = updateBigBlueButtonBnRecordingParams.parse(
			await req.json()
		)
		const validatedParams = bigBlueButtonBnRecordingIdSchema.parse({ id })

		const { bigBlueButtonBnRecording } = await updateBigBlueButtonBnRecording(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(bigBlueButtonBnRecording, { status: 200 })
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

		const validatedParams = bigBlueButtonBnRecordingIdSchema.parse({ id })
		const { bigBlueButtonBnRecording } = await deleteBigBlueButtonBnRecording(
			validatedParams.id
		)

		return NextResponse.json(bigBlueButtonBnRecording, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
