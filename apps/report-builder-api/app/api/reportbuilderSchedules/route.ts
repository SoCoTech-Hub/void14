import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createReportbuilderSchedule,
	deleteReportbuilderSchedule,
	updateReportbuilderSchedule
} from '@/lib/api/reportbuilderSchedules/mutations'
import {
	reportbuilderScheduleIdSchema,
	insertReportbuilderScheduleParams,
	updateReportbuilderScheduleParams
} from '@/lib/db/schema/reportbuilderSchedules'

export async function POST(req: Request) {
	try {
		const validatedData = insertReportbuilderScheduleParams.parse(
			await req.json()
		)
		const { reportbuilderSchedule } =
			await createReportbuilderSchedule(validatedData)

		revalidatePath('/reportbuilderSchedules') // optional - assumes you will have named route same as entity

		return NextResponse.json(reportbuilderSchedule, { status: 201 })
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

		const validatedData = updateReportbuilderScheduleParams.parse(
			await req.json()
		)
		const validatedParams = reportbuilderScheduleIdSchema.parse({ id })

		const { reportbuilderSchedule } = await updateReportbuilderSchedule(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(reportbuilderSchedule, { status: 200 })
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

		const validatedParams = reportbuilderScheduleIdSchema.parse({ id })
		const { reportbuilderSchedule } = await deleteReportbuilderSchedule(
			validatedParams.id
		)

		return NextResponse.json(reportbuilderSchedule, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
