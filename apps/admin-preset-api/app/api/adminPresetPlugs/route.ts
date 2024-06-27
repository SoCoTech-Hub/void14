import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAdminPresetPlug,
	deleteAdminPresetPlug,
	updateAdminPresetPlug
} from '@/lib/api/adminPresetPlugs/mutations'
import {
	adminPresetPlugIdSchema,
	insertAdminPresetPlugParams,
	updateAdminPresetPlugParams
} from '@/lib/db/schema/adminPresetPlugs'

export async function POST(req: Request) {
	try {
		const validatedData = insertAdminPresetPlugParams.parse(await req.json())
		const { adminPresetPlug } = await createAdminPresetPlug(validatedData)

		revalidatePath('/adminPresetPlugs') // optional - assumes you will have named route same as entity

		return NextResponse.json(adminPresetPlug, { status: 201 })
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

		const validatedData = updateAdminPresetPlugParams.parse(await req.json())
		const validatedParams = adminPresetPlugIdSchema.parse({ id })

		const { adminPresetPlug } = await updateAdminPresetPlug(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(adminPresetPlug, { status: 200 })
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

		const validatedParams = adminPresetPlugIdSchema.parse({ id })
		const { adminPresetPlug } = await deleteAdminPresetPlug(validatedParams.id)

		return NextResponse.json(adminPresetPlug, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
