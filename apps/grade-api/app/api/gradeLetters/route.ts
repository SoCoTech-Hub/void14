import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGradeLetter,
	deleteGradeLetter,
	updateGradeLetter
} from '@/lib/api/gradeLetters/mutations'
import {
	gradeLetterIdSchema,
	insertGradeLetterParams,
	updateGradeLetterParams
} from '@/lib/db/schema/gradeLetters'

export async function POST(req: Request) {
	try {
		const validatedData = insertGradeLetterParams.parse(await req.json())
		const { gradeLetter } = await createGradeLetter(validatedData)

		revalidatePath('/gradeLetters') // optional - assumes you will have named route same as entity

		return NextResponse.json(gradeLetter, { status: 201 })
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

		const validatedData = updateGradeLetterParams.parse(await req.json())
		const validatedParams = gradeLetterIdSchema.parse({ id })

		const { gradeLetter } = await updateGradeLetter(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(gradeLetter, { status: 200 })
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

		const validatedParams = gradeLetterIdSchema.parse({ id })
		const { gradeLetter } = await deleteGradeLetter(validatedParams.id)

		return NextResponse.json(gradeLetter, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
