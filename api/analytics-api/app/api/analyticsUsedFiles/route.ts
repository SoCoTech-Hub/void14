import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAnalyticsUsedFile,
	deleteAnalyticsUsedFile,
	updateAnalyticsUsedFile
} from '@/lib/api/analyticsUsedFiles/mutations'
import {
	analyticsUsedFileIdSchema,
	insertAnalyticsUsedFileParams,
	updateAnalyticsUsedFileParams
} from '@/lib/db/schema/analyticsUsedFiles'

export async function POST(req: Request) {
	try {
		const validatedData = insertAnalyticsUsedFileParams.parse(await req.json())
		const { analyticsUsedFile } = await createAnalyticsUsedFile(validatedData)

		revalidatePath('/analyticsUsedFiles') // optional - assumes you will have named route same as entity

		return NextResponse.json(analyticsUsedFile, { status: 201 })
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

		const validatedData = updateAnalyticsUsedFileParams.parse(await req.json())
		const validatedParams = analyticsUsedFileIdSchema.parse({ id })

		const { analyticsUsedFile } = await updateAnalyticsUsedFile(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(analyticsUsedFile, { status: 200 })
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

		const validatedParams = analyticsUsedFileIdSchema.parse({ id })
		const { analyticsUsedFile } = await deleteAnalyticsUsedFile(
			validatedParams.id
		)

		return NextResponse.json(analyticsUsedFile, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
