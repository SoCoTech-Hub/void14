import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradingformGuideComment,
	deleteGradingformGuideComment,
	updateGradingformGuideComment
} from '@/lib/api/gradingformGuideComments/mutations'
import {
	gradingformGuideCommentIdSchema,
	insertGradingformGuideCommentParams,
	updateGradingformGuideCommentParams
} from '@/lib/db/schema/gradingformGuideComments'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradingformGuideCommentParams.parse(
			await req.json()
		)
		const { gradingformGuideComment } =
			await createGradingformGuideComment(validatedData)

		revalidatePath('/gradingformGuideComments') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradingformGuideComment, { status: 201 })
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

		const validatedData = updateGradingformGuideCommentParams.parse(
			await req.json()
		)
		const validatedParams = gradingformGuideCommentIdSchema.parse({ id })

		const { gradingformGuideComment } = await updateGradingformGuideComment(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradingformGuideComment, { status: 200 })
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

		const validatedParams = gradingformGuideCommentIdSchema.parse({ id })
		const { gradingformGuideComment } = await deleteGradingformGuideComment(
			validatedParams.id
		)

		return NextResponse.json(gradingformGuideComment, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
