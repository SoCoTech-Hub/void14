import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createWikiSubwiki,
	deleteWikiSubwiki,
	updateWikiSubwiki
} from '@/lib/api/wikiSubwikis/mutations'
import {
	wikiSubwikiIdSchema,
	insertWikiSubwikiParams,
	updateWikiSubwikiParams
} from '@/lib/db/schema/wikiSubwikis'

export async function POST(req: Request) {
	try {
		const validatedData = insertWikiSubwikiParams.parse(await req.json())
		const { wikiSubwiki } = await createWikiSubwiki(validatedData)

		revalidatePath('/wikiSubwikis') // optional - assumes you will have named route same as entity

		return NextResponse.json(wikiSubwiki, { status: 201 })
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

		const validatedData = updateWikiSubwikiParams.parse(await req.json())
		const validatedParams = wikiSubwikiIdSchema.parse({ id })

		const { wikiSubwiki } = await updateWikiSubwiki(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(wikiSubwiki, { status: 200 })
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

		const validatedParams = wikiSubwikiIdSchema.parse({ id })
		const { wikiSubwiki } = await deleteWikiSubwiki(validatedParams.id)

		return NextResponse.json(wikiSubwiki, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
