import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createFavourite,
	deleteFavourite,
	updateFavourite
} from '@/lib/api/favourites/mutations'
import {
	favouriteIdSchema,
	insertFavouriteParams,
	updateFavouriteParams
} from '@/lib/db/schema/favourites'

export async function POST(req: Request) {
	try {
		const validatedData = insertFavouriteParams.parse(await req.json())
		const { favourite } = await createFavourite(validatedData)

		revalidatePath('/favourites') // optional - assumes you will have named route same as entity

		return NextResponse.json(favourite, { status: 201 })
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

		const validatedData = updateFavouriteParams.parse(await req.json())
		const validatedParams = favouriteIdSchema.parse({ id })

		const { favourite } = await updateFavourite(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(favourite, { status: 200 })
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

		const validatedParams = favouriteIdSchema.parse({ id })
		const { favourite } = await deleteFavourite(validatedParams.id)

		return NextResponse.json(favourite, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
