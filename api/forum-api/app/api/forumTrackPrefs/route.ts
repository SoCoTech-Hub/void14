import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createForumTrackPref,
	deleteForumTrackPref,
	updateForumTrackPref
} from '@/lib/api/forumTrackPrefs/mutations'
import {
	forumTrackPrefIdSchema,
	insertForumTrackPrefParams,
	updateForumTrackPrefParams
} from '@/lib/db/schema/forumTrackPrefs'

export async function POST(req: Request) {
	try {
		const validatedData = insertForumTrackPrefParams.parse(await req.json())
		const { forumTrackPref } = await createForumTrackPref(validatedData)

		revalidatePath('/forumTrackPrefs') // optional - assumes you will have named route same as entity

		return NextResponse.json(forumTrackPref, { status: 201 })
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

		const validatedData = updateForumTrackPrefParams.parse(await req.json())
		const validatedParams = forumTrackPrefIdSchema.parse({ id })

		const { forumTrackPref } = await updateForumTrackPref(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(forumTrackPref, { status: 200 })
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

		const validatedParams = forumTrackPrefIdSchema.parse({ id })
		const { forumTrackPref } = await deleteForumTrackPref(validatedParams.id)

		return NextResponse.json(forumTrackPref, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
