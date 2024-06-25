import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCourseSection,
	deleteCourseSection,
	updateCourseSection
} from '@/lib/api/courseSections/mutations'
import {
	courseSectionIdSchema,
	insertCourseSectionParams,
	updateCourseSectionParams
} from '@/lib/db/schema/courseSections'

export async function POST(req: Request) {
	try {
		const validatedData = insertCourseSectionParams.parse(await req.json())
		const { courseSection } = await createCourseSection(validatedData)

		revalidatePath('/courseSections') // optional - assumes you will have named route same as entity

		return NextResponse.json(courseSection, { status: 201 })
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

		const validatedData = updateCourseSectionParams.parse(await req.json())
		const validatedParams = courseSectionIdSchema.parse({ id })

		const { courseSection } = await updateCourseSection(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(courseSection, { status: 200 })
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

		const validatedParams = courseSectionIdSchema.parse({ id })
		const { courseSection } = await deleteCourseSection(validatedParams.id)

		return NextResponse.json(courseSection, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
