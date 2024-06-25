import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLogQuery,
	deleteLogQuery,
	updateLogQuery
} from '@/lib/api/logQueries/mutations'
import {
	logQueryIdSchema,
	insertLogQueryParams,
	updateLogQueryParams
} from '@/lib/db/schema/logQueries'

export async function POST(req: Request) {
	try {
		const validatedData = insertLogQueryParams.parse(await req.json())
		const { logQuery } = await createLogQuery(validatedData)

		revalidatePath('/logQueries') // optional - assumes you will have named route same as entity

		return NextResponse.json(logQuery, { status: 201 })
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

		const validatedData = updateLogQueryParams.parse(await req.json())
		const validatedParams = logQueryIdSchema.parse({ id })

		const { logQuery } = await updateLogQuery(validatedParams.id, validatedData)

		return NextResponse.json(logQuery, { status: 200 })
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

		const validatedParams = logQueryIdSchema.parse({ id })
		const { logQuery } = await deleteLogQuery(validatedParams.id)

		return NextResponse.json(logQuery, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
