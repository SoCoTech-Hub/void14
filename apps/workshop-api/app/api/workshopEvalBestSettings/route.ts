import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createWorkshopEvalBestSetting,
	deleteWorkshopEvalBestSetting,
	updateWorkshopEvalBestSetting
} from '@/lib/api/workshopEvalBestSettings/mutations'
import {
	workshopEvalBestSettingIdSchema,
	insertWorkshopEvalBestSettingParams,
	updateWorkshopEvalBestSettingParams
} from '@/lib/db/schema/workshopEvalBestSettings'

export async function POST(req: Request) {
	try {
		const validatedData = insertWorkshopEvalBestSettingParams.parse(
			await req.json()
		)
		const { workshopEvalBestSetting } =
			await createWorkshopEvalBestSetting(validatedData)

		revalidatePath('/workshopEvalBestSettings') // optional - assumes you will have named route same as entity

		return NextResponse.json(workshopEvalBestSetting, { status: 201 })
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

		const validatedData = updateWorkshopEvalBestSettingParams.parse(
			await req.json()
		)
		const validatedParams = workshopEvalBestSettingIdSchema.parse({ id })

		const { workshopEvalBestSetting } = await updateWorkshopEvalBestSetting(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(workshopEvalBestSetting, { status: 200 })
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

		const validatedParams = workshopEvalBestSettingIdSchema.parse({ id })
		const { workshopEvalBestSetting } = await deleteWorkshopEvalBestSetting(
			validatedParams.id
		)

		return NextResponse.json(workshopEvalBestSetting, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
