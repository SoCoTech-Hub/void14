import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLessonAttempt,
	deleteLessonAttempt,
	updateLessonAttempt
} from '@/lib/api/lessonAttempts/mutations'
import {
	lessonAttemptIdSchema,
	insertLessonAttemptParams,
	updateLessonAttemptParams
} from '@/lib/db/schema/lessonAttempts'

export async function POST(req: Request) {
	try {
		const validatedData = insertLessonAttemptParams.parse(await req.json())
		const { lessonAttempt } = await createLessonAttempt(validatedData)

		revalidatePath('/lessonAttempts') // optional - assumes you will have named route same as entity

		return NextResponse.json(lessonAttempt, { status: 201 })
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

		const validatedData = updateLessonAttemptParams.parse(await req.json())
		const validatedParams = lessonAttemptIdSchema.parse({ id })

		const { lessonAttempt } = await updateLessonAttempt(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(lessonAttempt, { status: 200 })
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

		const validatedParams = lessonAttemptIdSchema.parse({ id })
		const { lessonAttempt } = await deleteLessonAttempt(validatedParams.id)

		return NextResponse.json(lessonAttempt, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
