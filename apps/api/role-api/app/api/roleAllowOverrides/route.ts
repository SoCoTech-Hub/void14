import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createRoleAllowOverride,
	deleteRoleAllowOverride,
	updateRoleAllowOverride
} from '@/lib/api/roleAllowOverrides/mutations'
import {
	roleAllowOverrideIdSchema,
	insertRoleAllowOverrideParams,
	updateRoleAllowOverrideParams
} from '@/lib/db/schema/roleAllowOverrides'

export async function POST(req: Request) {
	try {
		const validatedData = insertRoleAllowOverrideParams.parse(await req.json())
		const { roleAllowOverride } = await createRoleAllowOverride(validatedData)

		revalidatePath('/roleAllowOverrides') // optional - assumes you will have named route same as entity

		return NextResponse.json(roleAllowOverride, { status: 201 })
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

		const validatedData = updateRoleAllowOverrideParams.parse(await req.json())
		const validatedParams = roleAllowOverrideIdSchema.parse({ id })

		const { roleAllowOverride } = await updateRoleAllowOverride(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(roleAllowOverride, { status: 200 })
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

		const validatedParams = roleAllowOverrideIdSchema.parse({ id })
		const { roleAllowOverride } = await deleteRoleAllowOverride(
			validatedParams.id
		)

		return NextResponse.json(roleAllowOverride, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
