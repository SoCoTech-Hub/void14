import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAssignSubmission,
	deleteAssignSubmission,
	updateAssignSubmission
} from '@/lib/api/assignSubmissions/mutations'
import {
	assignSubmissionIdSchema,
	insertAssignSubmissionParams,
	updateAssignSubmissionParams
} from '@/lib/db/schema/assignSubmissions'

export async function POST(req: Request) {
	try {
		const validatedData = insertAssignSubmissionParams.parse(await req.json())
		const { assignSubmission } = await createAssignSubmission(validatedData)

		revalidatePath('/assignSubmissions') // optional - assumes you will have named route same as entity

		return NextResponse.json(assignSubmission, { status: 201 })
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

		const validatedData = updateAssignSubmissionParams.parse(await req.json())
		const validatedParams = assignSubmissionIdSchema.parse({ id })

		const { assignSubmission } = await updateAssignSubmission(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(assignSubmission, { status: 200 })
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

		const validatedParams = assignSubmissionIdSchema.parse({ id })
		const { assignSubmission } = await deleteAssignSubmission(
			validatedParams.id
		)

		return NextResponse.json(assignSubmission, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
