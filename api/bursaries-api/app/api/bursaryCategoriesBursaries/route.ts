import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBursaryCategoriesBursary,
	deleteBursaryCategoriesBursary,
	updateBursaryCategoriesBursary
} from '@/lib/api/bursaryCategoriesBursaries/mutations'
import {
	bursaryCategoriesBursaryIdSchema,
	insertBursaryCategoriesBursaryParams,
	updateBursaryCategoriesBursaryParams
} from '@/lib/db/schema/bursaryCategoriesBursaries'

export async function POST(req: Request) {
	try {
		const validatedData = insertBursaryCategoriesBursaryParams.parse(
			await req.json()
		)
		const { bursaryCategoriesBursary } =
			await createBursaryCategoriesBursary(validatedData)

		revalidatePath('/bursaryCategoriesBursaries') // optional - assumes you will have named route same as entity

		return NextResponse.json(bursaryCategoriesBursary, { status: 201 })
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

		const validatedData = updateBursaryCategoriesBursaryParams.parse(
			await req.json()
		)
		const validatedParams = bursaryCategoriesBursaryIdSchema.parse({ id })

		const { bursaryCategoriesBursary } = await updateBursaryCategoriesBursary(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(bursaryCategoriesBursary, { status: 200 })
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

		const validatedParams = bursaryCategoriesBursaryIdSchema.parse({ id })
		const { bursaryCategoriesBursary } = await deleteBursaryCategoriesBursary(
			validatedParams.id
		)

		return NextResponse.json(bursaryCategoriesBursary, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
