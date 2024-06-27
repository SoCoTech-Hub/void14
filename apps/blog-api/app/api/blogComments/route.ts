import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBlogComment,
	deleteBlogComment,
	updateBlogComment
} from '@/lib/api/blogComments/mutations'
import {
	blogCommentIdSchema,
	insertBlogCommentParams,
	updateBlogCommentParams
} from '@/lib/db/schema/blogComments'

export async function POST(req: Request) {
	try {
		const validatedData = insertBlogCommentParams.parse(await req.json())
		const { blogComment } = await createBlogComment(validatedData)

		revalidatePath('/blogComments') // optional - assumes you will have named route same as entity

		return NextResponse.json(blogComment, { status: 201 })
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

		const validatedData = updateBlogCommentParams.parse(await req.json())
		const validatedParams = blogCommentIdSchema.parse({ id })

		const { blogComment } = await updateBlogComment(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(blogComment, { status: 200 })
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

		const validatedParams = blogCommentIdSchema.parse({ id })
		const { blogComment } = await deleteBlogComment(validatedParams.id)

		return NextResponse.json(blogComment, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
