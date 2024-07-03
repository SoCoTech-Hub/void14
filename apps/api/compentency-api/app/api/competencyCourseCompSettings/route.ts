import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCompetencyCourseCompSetting,
	deleteCompetencyCourseCompSetting,
	updateCompetencyCourseCompSetting
} from '@/lib/api/competencyCourseCompSettings/mutations'
import {
	competencyCourseCompSettingIdSchema,
	insertCompetencyCourseCompSettingParams,
	updateCompetencyCourseCompSettingParams
} from '@/lib/db/schema/competencyCourseCompSettings'

export async function POST(req: Request) {
	try {
		const validatedData = insertCompetencyCourseCompSettingParams.parse(
			await req.json()
		)
		const { competencyCourseCompSetting } =
			await createCompetencyCourseCompSetting(validatedData)

		revalidatePath('/competencyCourseCompSettings') // optional - assumes you will have named route same as entity

		return NextResponse.json(competencyCourseCompSetting, { status: 201 })
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

		const validatedData = updateCompetencyCourseCompSettingParams.parse(
			await req.json()
		)
		const validatedParams = competencyCourseCompSettingIdSchema.parse({ id })

		const { competencyCourseCompSetting } =
			await updateCompetencyCourseCompSetting(validatedParams.id, validatedData)

		return NextResponse.json(competencyCourseCompSetting, { status: 200 })
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

		const validatedParams = competencyCourseCompSettingIdSchema.parse({ id })
		const { competencyCourseCompSetting } =
			await deleteCompetencyCourseCompSetting(validatedParams.id)

		return NextResponse.json(competencyCourseCompSetting, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
