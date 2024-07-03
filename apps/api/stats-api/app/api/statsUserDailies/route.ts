import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createStatsUserDaily,
	deleteStatsUserDaily,
	updateStatsUserDaily
} from '@/lib/api/statsUserDailies/mutations'
import {
	statsUserDailyIdSchema,
	insertStatsUserDailyParams,
	updateStatsUserDailyParams
} from '@/lib/db/schema/statsUserDailies'

export async function POST(req: Request) {
	try {
		const validatedData = insertStatsUserDailyParams.parse(await req.json())
		const { statsUserDaily } = await createStatsUserDaily(validatedData)

		revalidatePath('/statsUserDailies') // optional - assumes you will have named route same as entity

		return NextResponse.json(statsUserDaily, { status: 201 })
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

		const validatedData = updateStatsUserDailyParams.parse(await req.json())
		const validatedParams = statsUserDailyIdSchema.parse({ id })

		const { statsUserDaily } = await updateStatsUserDaily(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(statsUserDaily, { status: 200 })
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

		const validatedParams = statsUserDailyIdSchema.parse({ id })
		const { statsUserDaily } = await deleteStatsUserDaily(validatedParams.id)

		return NextResponse.json(statsUserDaily, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
