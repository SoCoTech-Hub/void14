import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createReportbuilderReport,
	deleteReportbuilderReport,
	updateReportbuilderReport
} from '@/lib/api/reportbuilderReports/mutations'
import {
	reportbuilderReportIdSchema,
	insertReportbuilderReportParams,
	updateReportbuilderReportParams
} from '@/lib/db/schema/reportbuilderReports'

export async function POST(req: Request) {
	try {
		const validatedData = insertReportbuilderReportParams.parse(
			await req.json()
		)
		const { reportbuilderReport } =
			await createReportbuilderReport(validatedData)

		revalidatePath('/reportbuilderReports') // optional - assumes you will have named route same as entity

		return NextResponse.json(reportbuilderReport, { status: 201 })
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

		const validatedData = updateReportbuilderReportParams.parse(
			await req.json()
		)
		const validatedParams = reportbuilderReportIdSchema.parse({ id })

		const { reportbuilderReport } = await updateReportbuilderReport(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(reportbuilderReport, { status: 200 })
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

		const validatedParams = reportbuilderReportIdSchema.parse({ id })
		const { reportbuilderReport } = await deleteReportbuilderReport(
			validatedParams.id
		)

		return NextResponse.json(reportbuilderReport, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
