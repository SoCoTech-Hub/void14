import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEnrolLtiToolConsumerMap,
	deleteEnrolLtiToolConsumerMap,
	updateEnrolLtiToolConsumerMap
} from '@/lib/api/enrolLtiToolConsumerMaps/mutations'
import {
	enrolLtiToolConsumerMapIdSchema,
	insertEnrolLtiToolConsumerMapParams,
	updateEnrolLtiToolConsumerMapParams
} from '@/lib/db/schema/enrolLtiToolConsumerMaps'

export async function POST(req: Request) {
	try {
		const validatedData = insertEnrolLtiToolConsumerMapParams.parse(
			await req.json()
		)
		const { enrolLtiToolConsumerMap } =
			await createEnrolLtiToolConsumerMap(validatedData)

		revalidatePath('/enrolLtiToolConsumerMaps') // optional - assumes you will have named route same as entity

		return NextResponse.json(enrolLtiToolConsumerMap, { status: 201 })
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

		const validatedData = updateEnrolLtiToolConsumerMapParams.parse(
			await req.json()
		)
		const validatedParams = enrolLtiToolConsumerMapIdSchema.parse({ id })

		const { enrolLtiToolConsumerMap } = await updateEnrolLtiToolConsumerMap(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(enrolLtiToolConsumerMap, { status: 200 })
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

		const validatedParams = enrolLtiToolConsumerMapIdSchema.parse({ id })
		const { enrolLtiToolConsumerMap } = await deleteEnrolLtiToolConsumerMap(
			validatedParams.id
		)

		return NextResponse.json(enrolLtiToolConsumerMap, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
