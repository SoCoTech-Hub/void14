import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuizaccessSebTemplate,
	deleteQuizaccessSebTemplate,
	updateQuizaccessSebTemplate
} from '@/lib/api/quizaccessSebTemplates/mutations'
import {
	quizaccessSebTemplateIdSchema,
	insertQuizaccessSebTemplateParams,
	updateQuizaccessSebTemplateParams
} from '@/lib/db/schema/quizaccessSebTemplates'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuizaccessSebTemplateParams.parse(
			await req.json()
		)
		const { quizaccessSebTemplate } =
			await createQuizaccessSebTemplate(validatedData)

		revalidatePath('/quizaccessSebTemplates') // optional - assumes you will have named route same as entity

		return NextResponse.json(quizaccessSebTemplate, { status: 201 })
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

		const validatedData = updateQuizaccessSebTemplateParams.parse(
			await req.json()
		)
		const validatedParams = quizaccessSebTemplateIdSchema.parse({ id })

		const { quizaccessSebTemplate } = await updateQuizaccessSebTemplate(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(quizaccessSebTemplate, { status: 200 })
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

		const validatedParams = quizaccessSebTemplateIdSchema.parse({ id })
		const { quizaccessSebTemplate } = await deleteQuizaccessSebTemplate(
			validatedParams.id
		)

		return NextResponse.json(quizaccessSebTemplate, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
