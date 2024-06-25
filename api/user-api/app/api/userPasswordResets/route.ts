import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createUserPasswordReset,
	deleteUserPasswordReset,
	updateUserPasswordReset
} from '@/lib/api/userPasswordResets/mutations'
import {
	userPasswordResetIdSchema,
	insertUserPasswordResetParams,
	updateUserPasswordResetParams
} from '@/lib/db/schema/userPasswordResets'

export async function POST(req: Request) {
	try {
		const validatedData = insertUserPasswordResetParams.parse(await req.json())
		const { userPasswordReset } = await createUserPasswordReset(validatedData)

		revalidatePath('/userPasswordResets') // optional - assumes you will have named route same as entity

		return NextResponse.json(userPasswordReset, { status: 201 })
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

		const validatedData = updateUserPasswordResetParams.parse(await req.json())
		const validatedParams = userPasswordResetIdSchema.parse({ id })

		const { userPasswordReset } = await updateUserPasswordReset(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(userPasswordReset, { status: 200 })
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

		const validatedParams = userPasswordResetIdSchema.parse({ id })
		const { userPasswordReset } = await deleteUserPasswordReset(
			validatedParams.id
		)

		return NextResponse.json(userPasswordReset, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
