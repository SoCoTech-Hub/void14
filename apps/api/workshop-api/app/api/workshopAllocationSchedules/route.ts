import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createWorkshopAllocationSchedule,
	deleteWorkshopAllocationSchedule,
	updateWorkshopAllocationSchedule
} from '@/lib/api/workshopAllocationSchedules/mutations'
import {
	workshopAllocationScheduleIdSchema,
	insertWorkshopAllocationScheduleParams,
	updateWorkshopAllocationScheduleParams
} from '@/lib/db/schema/workshopAllocationSchedules'

export async function POST(req: Request) {
	try {
		const validatedData = insertWorkshopAllocationScheduleParams.parse(
			await req.json()
		)
		const { workshopAllocationSchedule } =
			await createWorkshopAllocationSchedule(validatedData)

		revalidatePath('/workshopAllocationSchedules') // optional - assumes you will have named route same as entity

		return NextResponse.json(workshopAllocationSchedule, { status: 201 })
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

		const validatedData = updateWorkshopAllocationScheduleParams.parse(
			await req.json()
		)
		const validatedParams = workshopAllocationScheduleIdSchema.parse({ id })

		const { workshopAllocationSchedule } =
			await updateWorkshopAllocationSchedule(validatedParams.id, validatedData)

		return NextResponse.json(workshopAllocationSchedule, { status: 200 })
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

		const validatedParams = workshopAllocationScheduleIdSchema.parse({ id })
		const { workshopAllocationSchedule } =
			await deleteWorkshopAllocationSchedule(validatedParams.id)

		return NextResponse.json(workshopAllocationSchedule, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
