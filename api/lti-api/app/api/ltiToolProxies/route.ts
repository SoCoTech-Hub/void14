import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLtiToolProxy,
	deleteLtiToolProxy,
	updateLtiToolProxy
} from '@/lib/api/ltiToolProxies/mutations'
import {
	ltiToolProxyIdSchema,
	insertLtiToolProxyParams,
	updateLtiToolProxyParams
} from '@/lib/db/schema/ltiToolProxies'

export async function POST(req: Request) {
	try {
		const validatedData = insertLtiToolProxyParams.parse(await req.json())
		const { ltiToolProxy } = await createLtiToolProxy(validatedData)

		revalidatePath('/ltiToolProxies') // optional - assumes you will have named route same as entity

		return NextResponse.json(ltiToolProxy, { status: 201 })
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

		const validatedData = updateLtiToolProxyParams.parse(await req.json())
		const validatedParams = ltiToolProxyIdSchema.parse({ id })

		const { ltiToolProxy } = await updateLtiToolProxy(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(ltiToolProxy, { status: 200 })
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

		const validatedParams = ltiToolProxyIdSchema.parse({ id })
		const { ltiToolProxy } = await deleteLtiToolProxy(validatedParams.id)

		return NextResponse.json(ltiToolProxy, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
