import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createReportbuilderColumn,
	deleteReportbuilderColumn,
	updateReportbuilderColumn
} from '@/lib/api/reportbuilderColumns/mutations'
import {
	reportbuilderColumnIdSchema,
	insertReportbuilderColumnParams,
	updateReportbuilderColumnParams
} from '@/lib/db/schema/reportbuilderColumns'

export async function POST(req: Request) {
	try {
		const validatedData = insertReportbuilderColumnParams.parse(
			await req.json()
		)
		const { reportbuilderColumn } =
			await createReportbuilderColumn(validatedData)

		revalidatePath('/reportbuilderColumns') // optional - assumes you will have named route same as entity

		return NextResponse.json(reportbuilderColumn, { status: 201 })
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

		const validatedData = updateReportbuilderColumnParams.parse(
			await req.json()
		)
		const validatedParams = reportbuilderColumnIdSchema.parse({ id })

		const { reportbuilderColumn } = await updateReportbuilderColumn(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(reportbuilderColumn, { status: 200 })
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

		const validatedParams = reportbuilderColumnIdSchema.parse({ id })
		const { reportbuilderColumn } = await deleteReportbuilderColumn(
			validatedParams.id
		)

		return NextResponse.json(reportbuilderColumn, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
