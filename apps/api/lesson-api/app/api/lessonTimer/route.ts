import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLessonTimer,
	deleteLessonTimer,
	updateLessonTimer
} from '@/lib/api/lessonTimer/mutations'
import {
	lessonTimerIdSchema,
	insertLessonTimerParams,
	updateLessonTimerParams
} from '@/lib/db/schema/lessonTimer'

export async function POST(req: Request) {
	try {
		const validatedData = insertLessonTimerParams.parse(await req.json())
		const { lessonTimer } = await createLessonTimer(validatedData)

		revalidatePath('/lessonTimer') // optional - assumes you will have named route same as entity

		return NextResponse.json(lessonTimer, { status: 201 })
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

		const validatedData = updateLessonTimerParams.parse(await req.json())
		const validatedParams = lessonTimerIdSchema.parse({ id })

		const { lessonTimer } = await updateLessonTimer(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(lessonTimer, { status: 200 })
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

		const validatedParams = lessonTimerIdSchema.parse({ id })
		const { lessonTimer } = await deleteLessonTimer(validatedParams.id)

		return NextResponse.json(lessonTimer, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
