import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLessonOverride,
	deleteLessonOverride,
	updateLessonOverride
} from '@/lib/api/lessonOverrides/mutations'
import {
	lessonOverrideIdSchema,
	insertLessonOverrideParams,
	updateLessonOverrideParams
} from '@/lib/db/schema/lessonOverrides'

export async function POST(req: Request) {
	try {
		const validatedData = insertLessonOverrideParams.parse(await req.json())
		const { lessonOverride } = await createLessonOverride(validatedData)

		revalidatePath('/lessonOverrides') // optional - assumes you will have named route same as entity

		return NextResponse.json(lessonOverride, { status: 201 })
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

		const validatedData = updateLessonOverrideParams.parse(await req.json())
		const validatedParams = lessonOverrideIdSchema.parse({ id })

		const { lessonOverride } = await updateLessonOverride(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(lessonOverride, { status: 200 })
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

		const validatedParams = lessonOverrideIdSchema.parse({ id })
		const { lessonOverride } = await deleteLessonOverride(validatedParams.id)

		return NextResponse.json(lessonOverride, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
