import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createUserEnrolment,
	deleteUserEnrolment,
	updateUserEnrolment
} from '@/lib/api/userEnrolments/mutations'
import {
	userEnrolmentIdSchema,
	insertUserEnrolmentParams,
	updateUserEnrolmentParams
} from '@/lib/db/schema/userEnrolments'

export async function POST(req: Request) {
	try {
		const validatedData = insertUserEnrolmentParams.parse(await req.json())
		const { userEnrolment } = await createUserEnrolment(validatedData)

		revalidatePath('/userEnrolments') // optional - assumes you will have named route same as entity

		return NextResponse.json(userEnrolment, { status: 201 })
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

		const validatedData = updateUserEnrolmentParams.parse(await req.json())
		const validatedParams = userEnrolmentIdSchema.parse({ id })

		const { userEnrolment } = await updateUserEnrolment(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(userEnrolment, { status: 200 })
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

		const validatedParams = userEnrolmentIdSchema.parse({ id })
		const { userEnrolment } = await deleteUserEnrolment(validatedParams.id)

		return NextResponse.json(userEnrolment, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
