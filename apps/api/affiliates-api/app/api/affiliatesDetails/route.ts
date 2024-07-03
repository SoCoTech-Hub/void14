import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAffiliatesDetail,
	deleteAffiliatesDetail,
	updateAffiliatesDetail
} from '@/lib/api/affiliatesDetails/mutations'
import {
	affiliatesDetailIdSchema,
	insertAffiliatesDetailParams,
	updateAffiliatesDetailParams
} from '@/lib/db/schema/affiliatesDetails'

export async function POST(req: Request) {
	try {
		const validatedData = insertAffiliatesDetailParams.parse(await req.json())
		const { affiliatesDetail } = await createAffiliatesDetail(validatedData)

		revalidatePath('/affiliatesDetails') // optional - assumes you will have named route same as entity

		return NextResponse.json(affiliatesDetail, { status: 201 })
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

		const validatedData = updateAffiliatesDetailParams.parse(await req.json())
		const validatedParams = affiliatesDetailIdSchema.parse({ id })

		const { affiliatesDetail } = await updateAffiliatesDetail(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(affiliatesDetail, { status: 200 })
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

		const validatedParams = affiliatesDetailIdSchema.parse({ id })
		const { affiliatesDetail } = await deleteAffiliatesDetail(
			validatedParams.id
		)

		return NextResponse.json(affiliatesDetail, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
