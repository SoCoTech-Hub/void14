import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAnalyticsIndicatorCalc,
	deleteAnalyticsIndicatorCalc,
	updateAnalyticsIndicatorCalc
} from '@/lib/api/analyticsIndicatorCalcs/mutations'
import {
	analyticsIndicatorCalcIdSchema,
	insertAnalyticsIndicatorCalcParams,
	updateAnalyticsIndicatorCalcParams
} from '@/lib/db/schema/analyticsIndicatorCalcs'

export async function POST(req: Request) {
	try {
		const validatedData = insertAnalyticsIndicatorCalcParams.parse(
			await req.json()
		)
		const { analyticsIndicatorCalc } =
			await createAnalyticsIndicatorCalc(validatedData)

		revalidatePath('/analyticsIndicatorCalcs') // optional - assumes you will have named route same as entity

		return NextResponse.json(analyticsIndicatorCalc, { status: 201 })
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

		const validatedData = updateAnalyticsIndicatorCalcParams.parse(
			await req.json()
		)
		const validatedParams = analyticsIndicatorCalcIdSchema.parse({ id })

		const { analyticsIndicatorCalc } = await updateAnalyticsIndicatorCalc(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(analyticsIndicatorCalc, { status: 200 })
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

		const validatedParams = analyticsIndicatorCalcIdSchema.parse({ id })
		const { analyticsIndicatorCalc } = await deleteAnalyticsIndicatorCalc(
			validatedParams.id
		)

		return NextResponse.json(analyticsIndicatorCalc, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
