import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createEnrolLtiTool,
	deleteEnrolLtiTool,
	updateEnrolLtiTool
} from '@/lib/api/enrolLtiTools/mutations'
import {
	enrolLtiToolIdSchema,
	insertEnrolLtiToolParams,
	updateEnrolLtiToolParams
} from '@/lib/db/schema/enrolLtiTools'

export async function POST(req: Request) {
	try {
		const validatedData = insertEnrolLtiToolParams.parse(await req.json())
		const { enrolLtiTool } = await createEnrolLtiTool(validatedData)

		revalidatePath('/enrolLtiTools') // optional - assumes you will have named route same as entity

		return NextResponse.json(enrolLtiTool, { status: 201 })
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

		const validatedData = updateEnrolLtiToolParams.parse(await req.json())
		const validatedParams = enrolLtiToolIdSchema.parse({ id })

		const { enrolLtiTool } = await updateEnrolLtiTool(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(enrolLtiTool, { status: 200 })
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

		const validatedParams = enrolLtiToolIdSchema.parse({ id })
		const { enrolLtiTool } = await deleteEnrolLtiTool(validatedParams.id)

		return NextResponse.json(enrolLtiTool, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
