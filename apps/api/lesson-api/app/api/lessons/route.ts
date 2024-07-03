import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLesson,
	deleteLesson,
	updateLesson
} from '@/lib/api/lessons/mutations'
import {
	lessonIdSchema,
	insertLessonParams,
	updateLessonParams
} from '@/lib/db/schema/lessons'

export async function POST(req: Request) {
	try {
		const validatedData = insertLessonParams.parse(await req.json())
		const { lesson } = await createLesson(validatedData)

		revalidatePath('/lessons') // optional - assumes you will have named route same as entity

		return NextResponse.json(lesson, { status: 201 })
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

		const validatedData = updateLessonParams.parse(await req.json())
		const validatedParams = lessonIdSchema.parse({ id })

		const { lesson } = await updateLesson(validatedParams.id, validatedData)

		return NextResponse.json(lesson, { status: 200 })
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

		const validatedParams = lessonIdSchema.parse({ id })
		const { lesson } = await deleteLesson(validatedParams.id)

		return NextResponse.json(lesson, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
