import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEnrolLtiLti2ToolProxy,
	deleteEnrolLtiLti2ToolProxy,
	updateEnrolLtiLti2ToolProxy
} from '@/lib/api/enrolLtiLti2ToolProxys/mutations'
import {
	enrolLtiLti2ToolProxyIdSchema,
	insertEnrolLtiLti2ToolProxyParams,
	updateEnrolLtiLti2ToolProxyParams
} from '@/lib/db/schema/enrolLtiLti2ToolProxys'

export async function POST(req: Request) {
	try {
		const validatedData = insertEnrolLtiLti2ToolProxyParams.parse(
			await req.json()
		)
		const { enrolLtiLti2ToolProxy } =
			await createEnrolLtiLti2ToolProxy(validatedData)

		revalidatePath('/enrolLtiLti2ToolProxys') // optional - assumes you will have named route same as entity

		return NextResponse.json(enrolLtiLti2ToolProxy, { status: 201 })
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

		const validatedData = updateEnrolLtiLti2ToolProxyParams.parse(
			await req.json()
		)
		const validatedParams = enrolLtiLti2ToolProxyIdSchema.parse({ id })

		const { enrolLtiLti2ToolProxy } = await updateEnrolLtiLti2ToolProxy(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(enrolLtiLti2ToolProxy, { status: 200 })
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

		const validatedParams = enrolLtiLti2ToolProxyIdSchema.parse({ id })
		const { enrolLtiLti2ToolProxy } = await deleteEnrolLtiLti2ToolProxy(
			validatedParams.id
		)

		return NextResponse.json(enrolLtiLti2ToolProxy, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
