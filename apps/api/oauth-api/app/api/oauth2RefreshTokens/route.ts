import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createOauth2RefreshToken,
	deleteOauth2RefreshToken,
	updateOauth2RefreshToken
} from '@/lib/api/oauth2RefreshTokens/mutations'
import {
	oauth2RefreshTokenIdSchema,
	insertOauth2RefreshTokenParams,
	updateOauth2RefreshTokenParams
} from '@/lib/db/schema/oauth2RefreshTokens'

export async function POST(req: Request) {
	try {
		const validatedData = insertOauth2RefreshTokenParams.parse(await req.json())
		const { oauth2RefreshToken } = await createOauth2RefreshToken(validatedData)

		revalidatePath('/oauth2RefreshTokens') // optional - assumes you will have named route same as entity

		return NextResponse.json(oauth2RefreshToken, { status: 201 })
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

		const validatedData = updateOauth2RefreshTokenParams.parse(await req.json())
		const validatedParams = oauth2RefreshTokenIdSchema.parse({ id })

		const { oauth2RefreshToken } = await updateOauth2RefreshToken(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(oauth2RefreshToken, { status: 200 })
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

		const validatedParams = oauth2RefreshTokenIdSchema.parse({ id })
		const { oauth2RefreshToken } = await deleteOauth2RefreshToken(
			validatedParams.id
		)

		return NextResponse.json(oauth2RefreshToken, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
