import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCourseRequest,
	deleteCourseRequest,
	updateCourseRequest
} from '@/lib/api/courseRequests/mutations'
import {
	courseRequestIdSchema,
	insertCourseRequestParams,
	updateCourseRequestParams
} from '@/lib/db/schema/courseRequests'

export async function POST(req: Request) {
	try {
		const validatedData = insertCourseRequestParams.parse(await req.json())
		const { courseRequest } = await createCourseRequest(validatedData)

		revalidatePath('/courseRequests') // optional - assumes you will have named route same as entity

		return NextResponse.json(courseRequest, { status: 201 })
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

		const validatedData = updateCourseRequestParams.parse(await req.json())
		const validatedParams = courseRequestIdSchema.parse({ id })

		const { courseRequest } = await updateCourseRequest(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(courseRequest, { status: 200 })
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

		const validatedParams = courseRequestIdSchema.parse({ id })
		const { courseRequest } = await deleteCourseRequest(validatedParams.id)

		return NextResponse.json(courseRequest, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
