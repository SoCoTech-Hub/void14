import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCompetencyTemplateCohort,
	deleteCompetencyTemplateCohort,
	updateCompetencyTemplateCohort
} from '@/lib/api/competencyTemplateCohorts/mutations'
import {
	competencyTemplateCohortIdSchema,
	insertCompetencyTemplateCohortParams,
	updateCompetencyTemplateCohortParams
} from '@/lib/db/schema/competencyTemplateCohorts'

export async function POST(req: Request) {
	try {
		const validatedData = insertCompetencyTemplateCohortParams.parse(
			await req.json()
		)
		const { competencyTemplateCohort } =
			await createCompetencyTemplateCohort(validatedData)

		revalidatePath('/competencyTemplateCohorts') // optional - assumes you will have named route same as entity

		return NextResponse.json(competencyTemplateCohort, { status: 201 })
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

		const validatedData = updateCompetencyTemplateCohortParams.parse(
			await req.json()
		)
		const validatedParams = competencyTemplateCohortIdSchema.parse({ id })

		const { competencyTemplateCohort } = await updateCompetencyTemplateCohort(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(competencyTemplateCohort, { status: 200 })
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

		const validatedParams = competencyTemplateCohortIdSchema.parse({ id })
		const { competencyTemplateCohort } = await deleteCompetencyTemplateCohort(
			validatedParams.id
		)

		return NextResponse.json(competencyTemplateCohort, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
