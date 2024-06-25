import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuizSection,
	deleteQuizSection,
	updateQuizSection
} from '@/lib/api/quizSections/mutations'
import {
	quizSectionIdSchema,
	insertQuizSectionParams,
	updateQuizSectionParams
} from '@/lib/db/schema/quizSections'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuizSectionParams.parse(await req.json())
		const { quizSection } = await createQuizSection(validatedData)

		revalidatePath('/quizSections') // optional - assumes you will have named route same as entity

		return NextResponse.json(quizSection, { status: 201 })
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

		const validatedData = updateQuizSectionParams.parse(await req.json())
		const validatedParams = quizSectionIdSchema.parse({ id })

		const { quizSection } = await updateQuizSection(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(quizSection, { status: 200 })
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

		const validatedParams = quizSectionIdSchema.parse({ id })
		const { quizSection } = await deleteQuizSection(validatedParams.id)

		return NextResponse.json(quizSection, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
