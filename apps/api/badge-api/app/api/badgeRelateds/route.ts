import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBadgeRelated,
	deleteBadgeRelated,
	updateBadgeRelated
} from '@/lib/api/badgeRelateds/mutations'
import {
	badgeRelatedIdSchema,
	insertBadgeRelatedParams,
	updateBadgeRelatedParams
} from '@/lib/db/schema/badgeRelateds'

export async function POST(req: Request) {
	try {
		const validatedData = insertBadgeRelatedParams.parse(await req.json())
		const { badgeRelated } = await createBadgeRelated(validatedData)

		revalidatePath('/badgeRelateds') // optional - assumes you will have named route same as entity

		return NextResponse.json(badgeRelated, { status: 201 })
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

		const validatedData = updateBadgeRelatedParams.parse(await req.json())
		const validatedParams = badgeRelatedIdSchema.parse({ id })

		const { badgeRelated } = await updateBadgeRelated(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(badgeRelated, { status: 200 })
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

		const validatedParams = badgeRelatedIdSchema.parse({ id })
		const { badgeRelated } = await deleteBadgeRelated(validatedParams.id)

		return NextResponse.json(badgeRelated, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
