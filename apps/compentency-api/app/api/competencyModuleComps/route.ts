import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCompetencyModuleComp,
	deleteCompetencyModuleComp,
	updateCompetencyModuleComp
} from '@/lib/api/competencyModuleComps/mutations'
import {
	competencyModuleCompIdSchema,
	insertCompetencyModuleCompParams,
	updateCompetencyModuleCompParams
} from '@/lib/db/schema/competencyModuleComps'

export async function POST(req: Request) {
	try {
		const validatedData = insertCompetencyModuleCompParams.parse(
			await req.json()
		)
		const { competencyModuleComp } =
			await createCompetencyModuleComp(validatedData)

		revalidatePath('/competencyModuleComps') // optional - assumes you will have named route same as entity

		return NextResponse.json(competencyModuleComp, { status: 201 })
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

		const validatedData = updateCompetencyModuleCompParams.parse(
			await req.json()
		)
		const validatedParams = competencyModuleCompIdSchema.parse({ id })

		const { competencyModuleComp } = await updateCompetencyModuleComp(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(competencyModuleComp, { status: 200 })
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

		const validatedParams = competencyModuleCompIdSchema.parse({ id })
		const { competencyModuleComp } = await deleteCompetencyModuleComp(
			validatedParams.id
		)

		return NextResponse.json(competencyModuleComp, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
