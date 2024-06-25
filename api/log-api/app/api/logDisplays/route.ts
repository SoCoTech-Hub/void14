import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLogDisplay,
	deleteLogDisplay,
	updateLogDisplay
} from '@/lib/api/logDisplays/mutations'
import {
	logDisplayIdSchema,
	insertLogDisplayParams,
	updateLogDisplayParams
} from '@/lib/db/schema/logDisplays'

export async function POST(req: Request) {
	try {
		const validatedData = insertLogDisplayParams.parse(await req.json())
		const { logDisplay } = await createLogDisplay(validatedData)

		revalidatePath('/logDisplays') // optional - assumes you will have named route same as entity

		return NextResponse.json(logDisplay, { status: 201 })
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

		const validatedData = updateLogDisplayParams.parse(await req.json())
		const validatedParams = logDisplayIdSchema.parse({ id })

		const { logDisplay } = await updateLogDisplay(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(logDisplay, { status: 200 })
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

		const validatedParams = logDisplayIdSchema.parse({ id })
		const { logDisplay } = await deleteLogDisplay(validatedParams.id)

		return NextResponse.json(logDisplay, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
