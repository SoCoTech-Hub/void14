import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLtiTypesConfig,
	deleteLtiTypesConfig,
	updateLtiTypesConfig
} from '@/lib/api/ltiTypesConfigs/mutations'
import {
	ltiTypesConfigIdSchema,
	insertLtiTypesConfigParams,
	updateLtiTypesConfigParams
} from '@/lib/db/schema/ltiTypesConfigs'

export async function POST(req: Request) {
	try {
		const validatedData = insertLtiTypesConfigParams.parse(await req.json())
		const { ltiTypesConfig } = await createLtiTypesConfig(validatedData)

		revalidatePath('/ltiTypesConfigs') // optional - assumes you will have named route same as entity

		return NextResponse.json(ltiTypesConfig, { status: 201 })
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

		const validatedData = updateLtiTypesConfigParams.parse(await req.json())
		const validatedParams = ltiTypesConfigIdSchema.parse({ id })

		const { ltiTypesConfig } = await updateLtiTypesConfig(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(ltiTypesConfig, { status: 200 })
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

		const validatedParams = ltiTypesConfigIdSchema.parse({ id })
		const { ltiTypesConfig } = await deleteLtiTypesConfig(validatedParams.id)

		return NextResponse.json(ltiTypesConfig, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
