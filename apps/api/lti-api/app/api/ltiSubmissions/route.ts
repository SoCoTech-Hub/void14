import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLtiSubmission,
	deleteLtiSubmission,
	updateLtiSubmission
} from '@/lib/api/ltiSubmissions/mutations'
import {
	ltiSubmissionIdSchema,
	insertLtiSubmissionParams,
	updateLtiSubmissionParams
} from '@/lib/db/schema/ltiSubmissions'

export async function POST(req: Request) {
	try {
		const validatedData = insertLtiSubmissionParams.parse(await req.json())
		const { ltiSubmission } = await createLtiSubmission(validatedData)

		revalidatePath('/ltiSubmissions') // optional - assumes you will have named route same as entity

		return NextResponse.json(ltiSubmission, { status: 201 })
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

		const validatedData = updateLtiSubmissionParams.parse(await req.json())
		const validatedParams = ltiSubmissionIdSchema.parse({ id })

		const { ltiSubmission } = await updateLtiSubmission(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(ltiSubmission, { status: 200 })
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

		const validatedParams = ltiSubmissionIdSchema.parse({ id })
		const { ltiSubmission } = await deleteLtiSubmission(validatedParams.id)

		return NextResponse.json(ltiSubmission, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
