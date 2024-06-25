import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCourseCompletionDefault,
	deleteCourseCompletionDefault,
	updateCourseCompletionDefault
} from '@/lib/api/courseCompletionDefaults/mutations'
import {
	courseCompletionDefaultIdSchema,
	insertCourseCompletionDefaultParams,
	updateCourseCompletionDefaultParams
} from '@/lib/db/schema/courseCompletionDefaults'

export async function POST(req: Request) {
	try {
		const validatedData = insertCourseCompletionDefaultParams.parse(
			await req.json()
		)
		const { courseCompletionDefault } =
			await createCourseCompletionDefault(validatedData)

		revalidatePath('/courseCompletionDefaults') // optional - assumes you will have named route same as entity

		return NextResponse.json(courseCompletionDefault, { status: 201 })
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

		const validatedData = updateCourseCompletionDefaultParams.parse(
			await req.json()
		)
		const validatedParams = courseCompletionDefaultIdSchema.parse({ id })

		const { courseCompletionDefault } = await updateCourseCompletionDefault(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(courseCompletionDefault, { status: 200 })
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

		const validatedParams = courseCompletionDefaultIdSchema.parse({ id })
		const { courseCompletionDefault } = await deleteCourseCompletionDefault(
			validatedParams.id
		)

		return NextResponse.json(courseCompletionDefault, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
