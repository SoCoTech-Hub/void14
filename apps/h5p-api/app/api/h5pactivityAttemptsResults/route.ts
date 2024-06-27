import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createH5pactivityAttemptsResult,
	deleteH5pactivityAttemptsResult,
	updateH5pactivityAttemptsResult
} from '@/lib/api/h5pactivityAttemptsResults/mutations'
import {
	h5pactivityAttemptsResultIdSchema,
	insertH5pactivityAttemptsResultParams,
	updateH5pactivityAttemptsResultParams
} from '@/lib/db/schema/h5pactivityAttemptsResults'

export async function POST(req: Request) {
	try {
		const validatedData = insertH5pactivityAttemptsResultParams.parse(
			await req.json()
		)
		const { h5pactivityAttemptsResult } =
			await createH5pactivityAttemptsResult(validatedData)

		revalidatePath('/h5pactivityAttemptsResults') // optional - assumes you will have named route same as entity

		return NextResponse.json(h5pactivityAttemptsResult, { status: 201 })
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

		const validatedData = updateH5pactivityAttemptsResultParams.parse(
			await req.json()
		)
		const validatedParams = h5pactivityAttemptsResultIdSchema.parse({ id })

		const { h5pactivityAttemptsResult } = await updateH5pactivityAttemptsResult(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(h5pactivityAttemptsResult, { status: 200 })
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

		const validatedParams = h5pactivityAttemptsResultIdSchema.parse({ id })
		const { h5pactivityAttemptsResult } = await deleteH5pactivityAttemptsResult(
			validatedParams.id
		)

		return NextResponse.json(h5pactivityAttemptsResult, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
