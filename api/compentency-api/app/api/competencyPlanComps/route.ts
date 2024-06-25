import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCompetencyPlanComp,
	deleteCompetencyPlanComp,
	updateCompetencyPlanComp
} from '@/lib/api/competencyPlanComps/mutations'
import {
	competencyPlanCompIdSchema,
	insertCompetencyPlanCompParams,
	updateCompetencyPlanCompParams
} from '@/lib/db/schema/competencyPlanComps'

export async function POST(req: Request) {
	try {
		const validatedData = insertCompetencyPlanCompParams.parse(await req.json())
		const { competencyPlanComp } = await createCompetencyPlanComp(validatedData)

		revalidatePath('/competencyPlanComps') // optional - assumes you will have named route same as entity

		return NextResponse.json(competencyPlanComp, { status: 201 })
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

		const validatedData = updateCompetencyPlanCompParams.parse(await req.json())
		const validatedParams = competencyPlanCompIdSchema.parse({ id })

		const { competencyPlanComp } = await updateCompetencyPlanComp(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(competencyPlanComp, { status: 200 })
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

		const validatedParams = competencyPlanCompIdSchema.parse({ id })
		const { competencyPlanComp } = await deleteCompetencyPlanComp(
			validatedParams.id
		)

		return NextResponse.json(competencyPlanComp, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
