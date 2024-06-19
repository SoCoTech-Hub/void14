import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createQuize,
	deleteQuize,
	updateQuize
} from '@/lib/api/quizes/mutations'
import {
	quizIdSchema,
	insertQuizeParams,
	updateQuizeParams
} from '@/lib/db/schema/quizes'

export async function POST(req: Request) {
	try {
		const validatedData = insertQuizeParams.parse(await req.json())
		const { quize } = await createQuize(validatedData)

		revalidatePath('/quizes') // optional - assumes you will have named route same as entity

		return NextResponse.json(quize, { status: 201 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json({ error: err }, { status: 500 })
		}
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedData = updateQuizeParams.parse(await req.json())
		const validatedParams = quizIdSchema.parse({ id })

		const { quize } = await updateQuize(validatedParams.id, validatedData)

		return NextResponse.json(quize, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedParams = quizIdSchema.parse({ id })
		const { quize } = await deleteQuize(validatedParams.id)

		return NextResponse.json(quize, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}
