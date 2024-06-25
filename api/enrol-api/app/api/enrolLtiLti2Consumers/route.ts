import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEnrolLtiLti2Consumer,
	deleteEnrolLtiLti2Consumer,
	updateEnrolLtiLti2Consumer
} from '@/lib/api/enrolLtiLti2Consumers/mutations'
import {
	enrolLtiLti2ConsumerIdSchema,
	insertEnrolLtiLti2ConsumerParams,
	updateEnrolLtiLti2ConsumerParams
} from '@/lib/db/schema/enrolLtiLti2Consumers'

export async function POST(req: Request) {
	try {
		const validatedData = insertEnrolLtiLti2ConsumerParams.parse(
			await req.json()
		)
		const { enrolLtiLti2Consumer } =
			await createEnrolLtiLti2Consumer(validatedData)

		revalidatePath('/enrolLtiLti2Consumers') // optional - assumes you will have named route same as entity

		return NextResponse.json(enrolLtiLti2Consumer, { status: 201 })
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

		const validatedData = updateEnrolLtiLti2ConsumerParams.parse(
			await req.json()
		)
		const validatedParams = enrolLtiLti2ConsumerIdSchema.parse({ id })

		const { enrolLtiLti2Consumer } = await updateEnrolLtiLti2Consumer(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(enrolLtiLti2Consumer, { status: 200 })
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

		const validatedParams = enrolLtiLti2ConsumerIdSchema.parse({ id })
		const { enrolLtiLti2Consumer } = await deleteEnrolLtiLti2Consumer(
			validatedParams.id
		)

		return NextResponse.json(enrolLtiLti2Consumer, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
