import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createSession,
	deleteSession,
	updateSession
} from '@/lib/api/sessions/mutations'
import {
	sessionIdSchema,
	insertSessionParams,
	updateSessionParams
} from '@/lib/db/schema/sessions'

export async function POST(req: Request) {
	try {
		const validatedData = insertSessionParams.parse(await req.json())
		const { session } = await createSession(validatedData)

		revalidatePath('/sessions') // optional - assumes you will have named route same as entity

		return NextResponse.json(session, { status: 201 })
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

		const validatedData = updateSessionParams.parse(await req.json())
		const validatedParams = sessionIdSchema.parse({ id })

		const { session } = await updateSession(validatedParams.id, validatedData)

		return NextResponse.json(session, { status: 200 })
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

		const validatedParams = sessionIdSchema.parse({ id })
		const { session } = await deleteSession(validatedParams.id)

		return NextResponse.json(session, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
