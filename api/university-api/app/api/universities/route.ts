import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createUniversity,
	deleteUniversity,
	updateUniversity
} from '@/lib/api/universities/mutations'
import {
	universityIdSchema,
	insertUniversityParams,
	updateUniversityParams
} from '@/lib/db/schema/universities'

export async function POST(req: Request) {
	try {
		const validatedData = insertUniversityParams.parse(await req.json())
		const { university } = await createUniversity(validatedData)

		revalidatePath('/universities') // optional - assumes you will have named route same as entity

		return NextResponse.json(university, { status: 201 })
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

		const validatedData = updateUniversityParams.parse(await req.json())
		const validatedParams = universityIdSchema.parse({ id })

		const { university } = await updateUniversity(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(university, { status: 200 })
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

		const validatedParams = universityIdSchema.parse({ id })
		const { university } = await deleteUniversity(validatedParams.id)

		return NextResponse.json(university, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
