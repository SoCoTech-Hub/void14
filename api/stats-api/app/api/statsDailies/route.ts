import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createStatsDaily,
	deleteStatsDaily,
	updateStatsDaily
} from '@/lib/api/statsDailies/mutations'
import {
	statsDailyIdSchema,
	insertStatsDailyParams,
	updateStatsDailyParams
} from '@/lib/db/schema/statsDailies'

export async function POST(req: Request) {
	try {
		const validatedData = insertStatsDailyParams.parse(await req.json())
		const { statsDaily } = await createStatsDaily(validatedData)

		revalidatePath('/statsDailies') // optional - assumes you will have named route same as entity

		return NextResponse.json(statsDaily, { status: 201 })
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

		const validatedData = updateStatsDailyParams.parse(await req.json())
		const validatedParams = statsDailyIdSchema.parse({ id })

		const { statsDaily } = await updateStatsDaily(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(statsDaily, { status: 200 })
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

		const validatedParams = statsDailyIdSchema.parse({ id })
		const { statsDaily } = await deleteStatsDaily(validatedParams.id)

		return NextResponse.json(statsDaily, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
