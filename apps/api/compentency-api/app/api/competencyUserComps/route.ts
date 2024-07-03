import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCompetencyUserComp,
	deleteCompetencyUserComp,
	updateCompetencyUserComp
} from '@/lib/api/competencyUserComps/mutations'
import {
	competencyUserCompIdSchema,
	insertCompetencyUserCompParams,
	updateCompetencyUserCompParams
} from '@/lib/db/schema/competencyUserComps'

export async function POST(req: Request) {
	try {
		const validatedData = insertCompetencyUserCompParams.parse(await req.json())
		const { competencyUserComp } = await createCompetencyUserComp(validatedData)

		revalidatePath('/competencyUserComps') // optional - assumes you will have named route same as entity

		return NextResponse.json(competencyUserComp, { status: 201 })
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

		const validatedData = updateCompetencyUserCompParams.parse(await req.json())
		const validatedParams = competencyUserCompIdSchema.parse({ id })

		const { competencyUserComp } = await updateCompetencyUserComp(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(competencyUserComp, { status: 200 })
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

		const validatedParams = competencyUserCompIdSchema.parse({ id })
		const { competencyUserComp } = await deleteCompetencyUserComp(
			validatedParams.id
		)

		return NextResponse.json(competencyUserComp, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
