import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAnalyticsModelLog,
	deleteAnalyticsModelLog,
	updateAnalyticsModelLog
} from '@/lib/api/analyticsModelLogs/mutations'
import {
	analyticsModelLogIdSchema,
	insertAnalyticsModelLogParams,
	updateAnalyticsModelLogParams
} from '@/lib/db/schema/analyticsModelLogs'

export async function POST(req: Request) {
	try {
		const validatedData = insertAnalyticsModelLogParams.parse(await req.json())
		const { analyticsModelLog } = await createAnalyticsModelLog(validatedData)

		revalidatePath('/analyticsModelLogs') // optional - assumes you will have named route same as entity

		return NextResponse.json(analyticsModelLog, { status: 201 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json({ error: err }, { status: 500 })
		}
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedData = updateAnalyticsModelLogParams.parse(await req.json())
		const validatedParams = analyticsModelLogIdSchema.parse({ id })

		const { analyticsModelLog } = await updateAnalyticsModelLog(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(analyticsModelLog, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')

		const validatedParams = analyticsModelLogIdSchema.parse({ id })
		const { analyticsModelLog } = await deleteAnalyticsModelLog(
			validatedParams.id
		)

		return NextResponse.json(analyticsModelLog, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		} else {
			return NextResponse.json(err, { status: 500 })
		}
	}
}
