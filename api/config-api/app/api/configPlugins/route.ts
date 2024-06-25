import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createConfigPlugin,
	deleteConfigPlugin,
	updateConfigPlugin
} from '@/lib/api/configPlugins/mutations'
import {
	configPluginIdSchema,
	insertConfigPluginParams,
	updateConfigPluginParams
} from '@/lib/db/schema/configPlugins'

export async function POST(req: Request) {
	try {
		const validatedData = insertConfigPluginParams.parse(await req.json())
		const { configPlugin } = await createConfigPlugin(validatedData)

		revalidatePath('/configPlugins') // optional - assumes you will have named route same as entity

		return NextResponse.json(configPlugin, { status: 201 })
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

		const validatedData = updateConfigPluginParams.parse(await req.json())
		const validatedParams = configPluginIdSchema.parse({ id })

		const { configPlugin } = await updateConfigPlugin(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(configPlugin, { status: 200 })
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

		const validatedParams = configPluginIdSchema.parse({ id })
		const { configPlugin } = await deleteConfigPlugin(validatedParams.id)

		return NextResponse.json(configPlugin, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
