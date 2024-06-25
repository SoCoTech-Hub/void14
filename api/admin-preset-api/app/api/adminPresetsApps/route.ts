import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createAdminPresetsApp,
	deleteAdminPresetsApp,
	updateAdminPresetsApp
} from '@/lib/api/adminPresetsApps/mutations'
import {
	adminPresetsAppIdSchema,
	insertAdminPresetsAppParams,
	updateAdminPresetsAppParams
} from '@/lib/db/schema/adminPresetsApps'

export async function POST(req: Request) {
	try {
		const validatedData = insertAdminPresetsAppParams.parse(await req.json())
		const { adminPresetsApp } = await createAdminPresetsApp(validatedData)

		revalidatePath('/adminPresetsApps') // optional - assumes you will have named route same as entity

		return NextResponse.json(adminPresetsApp, { status: 201 })
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

		const validatedData = updateAdminPresetsAppParams.parse(await req.json())
		const validatedParams = adminPresetsAppIdSchema.parse({ id })

		const { adminPresetsApp } = await updateAdminPresetsApp(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(adminPresetsApp, { status: 200 })
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

		const validatedParams = adminPresetsAppIdSchema.parse({ id })
		const { adminPresetsApp } = await deleteAdminPresetsApp(validatedParams.id)

		return NextResponse.json(adminPresetsApp, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
