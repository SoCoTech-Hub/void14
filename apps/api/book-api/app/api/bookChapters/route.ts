import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBookChapter,
	deleteBookChapter,
	updateBookChapter
} from '@/lib/api/bookChapters/mutations'
import {
	bookChapterIdSchema,
	insertBookChapterParams,
	updateBookChapterParams
} from '@/lib/db/schema/bookChapters'

export async function POST(req: Request) {
	try {
		const validatedData = insertBookChapterParams.parse(await req.json())
		const { bookChapter } = await createBookChapter(validatedData)

		revalidatePath('/bookChapters') // optional - assumes you will have named route same as entity

		return NextResponse.json(bookChapter, { status: 201 })
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

		const validatedData = updateBookChapterParams.parse(await req.json())
		const validatedParams = bookChapterIdSchema.parse({ id })

		const { bookChapter } = await updateBookChapter(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(bookChapter, { status: 200 })
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

		const validatedParams = bookChapterIdSchema.parse({ id })
		const { bookChapter } = await deleteBookChapter(validatedParams.id)

		return NextResponse.json(bookChapter, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
