import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLtiserviceGradebookservice,
	deleteLtiserviceGradebookservice,
	updateLtiserviceGradebookservice
} from '@/lib/api/ltiserviceGradebookservices/mutations'
import {
	ltiserviceGradebookserviceIdSchema,
	insertLtiserviceGradebookserviceParams,
	updateLtiserviceGradebookserviceParams
} from '@/lib/db/schema/ltiserviceGradebookservices'

export async function POST(req: Request) {
	try {
		const validatedData = insertLtiserviceGradebookserviceParams.parse(
			await req.json()
		)
		const { ltiserviceGradebookservice } =
			await createLtiserviceGradebookservice(validatedData)

		revalidatePath('/ltiserviceGradebookservices') // optional - assumes you will have named route same as entity

		return NextResponse.json(ltiserviceGradebookservice, { status: 201 })
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

		const validatedData = updateLtiserviceGradebookserviceParams.parse(
			await req.json()
		)
		const validatedParams = ltiserviceGradebookserviceIdSchema.parse({ id })

		const { ltiserviceGradebookservice } =
			await updateLtiserviceGradebookservice(validatedParams.id, validatedData)

		return NextResponse.json(ltiserviceGradebookservice, { status: 200 })
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

		const validatedParams = ltiserviceGradebookserviceIdSchema.parse({ id })
		const { ltiserviceGradebookservice } =
			await deleteLtiserviceGradebookservice(validatedParams.id)

		return NextResponse.json(ltiserviceGradebookservice, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
