import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBlogAssociation,
	deleteBlogAssociation,
	updateBlogAssociation
} from '@/lib/api/blogAssociations/mutations'
import {
	blogAssociationIdSchema,
	insertBlogAssociationParams,
	updateBlogAssociationParams
} from '@/lib/db/schema/blogAssociations'

export async function POST(req: Request) {
	try {
		const validatedData = insertBlogAssociationParams.parse(await req.json())
		const { blogAssociation } = await createBlogAssociation(validatedData)

		revalidatePath('/blogAssociations') // optional - assumes you will have named route same as entity

		return NextResponse.json(blogAssociation, { status: 201 })
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

		const validatedData = updateBlogAssociationParams.parse(await req.json())
		const validatedParams = blogAssociationIdSchema.parse({ id })

		const { blogAssociation } = await updateBlogAssociation(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(blogAssociation, { status: 200 })
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

		const validatedParams = blogAssociationIdSchema.parse({ id })
		const { blogAssociation } = await deleteBlogAssociation(validatedParams.id)

		return NextResponse.json(blogAssociation, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
