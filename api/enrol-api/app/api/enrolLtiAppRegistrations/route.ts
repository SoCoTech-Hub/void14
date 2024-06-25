import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEnrolLtiAppRegistration,
	deleteEnrolLtiAppRegistration,
	updateEnrolLtiAppRegistration
} from '@/lib/api/enrolLtiAppRegistrations/mutations'
import {
	enrolLtiAppRegistrationIdSchema,
	insertEnrolLtiAppRegistrationParams,
	updateEnrolLtiAppRegistrationParams
} from '@/lib/db/schema/enrolLtiAppRegistrations'

export async function POST(req: Request) {
	try {
		const validatedData = insertEnrolLtiAppRegistrationParams.parse(
			await req.json()
		)
		const { enrolLtiAppRegistration } =
			await createEnrolLtiAppRegistration(validatedData)

		revalidatePath('/enrolLtiAppRegistrations') // optional - assumes you will have named route same as entity

		return NextResponse.json(enrolLtiAppRegistration, { status: 201 })
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

		const validatedData = updateEnrolLtiAppRegistrationParams.parse(
			await req.json()
		)
		const validatedParams = enrolLtiAppRegistrationIdSchema.parse({ id })

		const { enrolLtiAppRegistration } = await updateEnrolLtiAppRegistration(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(enrolLtiAppRegistration, { status: 200 })
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

		const validatedParams = enrolLtiAppRegistrationIdSchema.parse({ id })
		const { enrolLtiAppRegistration } = await deleteEnrolLtiAppRegistration(
			validatedParams.id
		)

		return NextResponse.json(enrolLtiAppRegistration, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
