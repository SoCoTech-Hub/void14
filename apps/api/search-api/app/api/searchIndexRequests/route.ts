import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createSearchIndexRequest,
	deleteSearchIndexRequest,
	updateSearchIndexRequest
} from '@/lib/api/searchIndexRequests/mutations'
import {
	searchIndexRequestIdSchema,
	insertSearchIndexRequestParams,
	updateSearchIndexRequestParams
} from '@/lib/db/schema/searchIndexRequests'

export async function POST(req: Request) {
	try {
		const validatedData = insertSearchIndexRequestParams.parse(await req.json())
		const { searchIndexRequest } = await createSearchIndexRequest(validatedData)

		revalidatePath('/searchIndexRequests') // optional - assumes you will have named route same as entity

		return NextResponse.json(searchIndexRequest, { status: 201 })
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

		const validatedData = updateSearchIndexRequestParams.parse(await req.json())
		const validatedParams = searchIndexRequestIdSchema.parse({ id })

		const { searchIndexRequest } = await updateSearchIndexRequest(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(searchIndexRequest, { status: 200 })
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

		const validatedParams = searchIndexRequestIdSchema.parse({ id })
		const { searchIndexRequest } = await deleteSearchIndexRequest(
			validatedParams.id
		)

		return NextResponse.json(searchIndexRequest, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
