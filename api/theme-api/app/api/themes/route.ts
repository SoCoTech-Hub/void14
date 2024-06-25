import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createTheme,
	deleteTheme,
	updateTheme
} from '@/lib/api/themes/mutations'
import {
	themeIdSchema,
	insertThemeParams,
	updateThemeParams
} from '@/lib/db/schema/themes'

export async function POST(req: Request) {
	try {
		const validatedData = insertThemeParams.parse(await req.json())
		const { theme } = await createTheme(validatedData)

		revalidatePath('/themes') // optional - assumes you will have named route same as entity

		return NextResponse.json(theme, { status: 201 })
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

		const validatedData = updateThemeParams.parse(await req.json())
		const validatedParams = themeIdSchema.parse({ id })

		const { theme } = await updateTheme(validatedParams.id, validatedData)

		return NextResponse.json(theme, { status: 200 })
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

		const validatedParams = themeIdSchema.parse({ id })
		const { theme } = await deleteTheme(validatedParams.id)

		return NextResponse.json(theme, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
