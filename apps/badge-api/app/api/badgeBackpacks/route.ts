import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBadgeBackpack,
	deleteBadgeBackpack,
	updateBadgeBackpack
} from '@/lib/api/badgeBackpacks/mutations'
import {
	badgeBackpackIdSchema,
	insertBadgeBackpackParams,
	updateBadgeBackpackParams
} from '@/lib/db/schema/badgeBackpacks'

export async function POST(req: Request) {
	try {
		const validatedData = insertBadgeBackpackParams.parse(await req.json())
		const { badgeBackpack } = await createBadgeBackpack(validatedData)

		revalidatePath('/badgeBackpacks') // optional - assumes you will have named route same as entity

		return NextResponse.json(badgeBackpack, { status: 201 })
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

		const validatedData = updateBadgeBackpackParams.parse(await req.json())
		const validatedParams = badgeBackpackIdSchema.parse({ id })

		const { badgeBackpack } = await updateBadgeBackpack(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(badgeBackpack, { status: 200 })
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

		const validatedParams = badgeBackpackIdSchema.parse({ id })
		const { badgeBackpack } = await deleteBadgeBackpack(validatedParams.id)

		return NextResponse.json(badgeBackpack, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
