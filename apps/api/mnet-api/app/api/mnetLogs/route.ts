import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMnetLog,
	deleteMnetLog,
	updateMnetLog
} from '@/lib/api/mnetLogs/mutations'
import {
	mnetLogIdSchema,
	insertMnetLogParams,
	updateMnetLogParams
} from '@/lib/db/schema/mnetLogs'

export async function POST(req: Request) {
	try {
		const validatedData = insertMnetLogParams.parse(await req.json())
		const { mnetLog } = await createMnetLog(validatedData)

		revalidatePath('/mnetLogs') // optional - assumes you will have named route same as entity

		return NextResponse.json(mnetLog, { status: 201 })
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

		const validatedData = updateMnetLogParams.parse(await req.json())
		const validatedParams = mnetLogIdSchema.parse({ id })

		const { mnetLog } = await updateMnetLog(validatedParams.id, validatedData)

		return NextResponse.json(mnetLog, { status: 200 })
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

		const validatedParams = mnetLogIdSchema.parse({ id })
		const { mnetLog } = await deleteMnetLog(validatedParams.id)

		return NextResponse.json(mnetLog, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
