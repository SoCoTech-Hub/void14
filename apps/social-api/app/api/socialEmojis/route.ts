import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createSocialEmoji,
	deleteSocialEmoji,
	updateSocialEmoji
} from '@/lib/api/socialEmojis/mutations'
import {
	socialEmojiIdSchema,
	insertSocialEmojiParams,
	updateSocialEmojiParams
} from '@/lib/db/schema/socialEmojis'

export async function POST(req: Request) {
	try {
		const validatedData = insertSocialEmojiParams.parse(await req.json())
		const { socialEmoji } = await createSocialEmoji(validatedData)

		revalidatePath('/socialEmojis') // optional - assumes you will have named route same as entity

		return NextResponse.json(socialEmoji, { status: 201 })
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

		const validatedData = updateSocialEmojiParams.parse(await req.json())
		const validatedParams = socialEmojiIdSchema.parse({ id })

		const { socialEmoji } = await updateSocialEmoji(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(socialEmoji, { status: 200 })
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

		const validatedParams = socialEmojiIdSchema.parse({ id })
		const { socialEmoji } = await deleteSocialEmoji(validatedParams.id)

		return NextResponse.json(socialEmoji, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
