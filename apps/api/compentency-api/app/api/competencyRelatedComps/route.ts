import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCompetencyRelatedComp,
	deleteCompetencyRelatedComp,
	updateCompetencyRelatedComp
} from '@/lib/api/competencyRelatedComps/mutations'
import {
	competencyRelatedCompIdSchema,
	insertCompetencyRelatedCompParams,
	updateCompetencyRelatedCompParams
} from '@/lib/db/schema/competencyRelatedComps'

export async function POST(req: Request) {
	try {
		const validatedData = insertCompetencyRelatedCompParams.parse(
			await req.json()
		)
		const { competencyRelatedComp } =
			await createCompetencyRelatedComp(validatedData)

		revalidatePath('/competencyRelatedComps') // optional - assumes you will have named route same as entity

		return NextResponse.json(competencyRelatedComp, { status: 201 })
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

		const validatedData = updateCompetencyRelatedCompParams.parse(
			await req.json()
		)
		const validatedParams = competencyRelatedCompIdSchema.parse({ id })

		const { competencyRelatedComp } = await updateCompetencyRelatedComp(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(competencyRelatedComp, { status: 200 })
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

		const validatedParams = competencyRelatedCompIdSchema.parse({ id })
		const { competencyRelatedComp } = await deleteCompetencyRelatedComp(
			validatedParams.id
		)

		return NextResponse.json(competencyRelatedComp, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
