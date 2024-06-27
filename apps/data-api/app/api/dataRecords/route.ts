import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createDataRecord,
	deleteDataRecord,
	updateDataRecord
} from '@/lib/api/dataRecords/mutations'
import {
	dataRecordIdSchema,
	insertDataRecordParams,
	updateDataRecordParams
} from '@/lib/db/schema/dataRecords'

export async function POST(req: Request) {
	try {
		const validatedData = insertDataRecordParams.parse(await req.json())
		const { dataRecord } = await createDataRecord(validatedData)

		revalidatePath('/dataRecords') // optional - assumes you will have named route same as entity

		return NextResponse.json(dataRecord, { status: 201 })
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

		const validatedData = updateDataRecordParams.parse(await req.json())
		const validatedParams = dataRecordIdSchema.parse({ id })

		const { dataRecord } = await updateDataRecord(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(dataRecord, { status: 200 })
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

		const validatedParams = dataRecordIdSchema.parse({ id })
		const { dataRecord } = await deleteDataRecord(validatedParams.id)

		return NextResponse.json(dataRecord, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
