import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLtiToolSetting,
	deleteLtiToolSetting,
	updateLtiToolSetting
} from '@/lib/api/ltiToolSettings/mutations'
import {
	ltiToolSettingIdSchema,
	insertLtiToolSettingParams,
	updateLtiToolSettingParams
} from '@/lib/db/schema/ltiToolSettings'

export async function POST(req: Request) {
	try {
		const validatedData = insertLtiToolSettingParams.parse(await req.json())
		const { ltiToolSetting } = await createLtiToolSetting(validatedData)

		revalidatePath('/ltiToolSettings') // optional - assumes you will have named route same as entity

		return NextResponse.json(ltiToolSetting, { status: 201 })
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

		const validatedData = updateLtiToolSettingParams.parse(await req.json())
		const validatedParams = ltiToolSettingIdSchema.parse({ id })

		const { ltiToolSetting } = await updateLtiToolSetting(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(ltiToolSetting, { status: 200 })
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

		const validatedParams = ltiToolSettingIdSchema.parse({ id })
		const { ltiToolSetting } = await deleteLtiToolSetting(validatedParams.id)

		return NextResponse.json(ltiToolSetting, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
