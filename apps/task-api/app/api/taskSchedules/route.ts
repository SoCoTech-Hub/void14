import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createTaskSchedule,
	deleteTaskSchedule,
	updateTaskSchedule
} from '@/lib/api/taskSchedules/mutations'
import {
	taskScheduleIdSchema,
	insertTaskScheduleParams,
	updateTaskScheduleParams
} from '@/lib/db/schema/taskSchedules'

export async function POST(req: Request) {
	try {
		const validatedData = insertTaskScheduleParams.parse(await req.json())
		const { taskSchedule } = await createTaskSchedule(validatedData)

		revalidatePath('/taskSchedules') // optional - assumes you will have named route same as entity

		return NextResponse.json(taskSchedule, { status: 201 })
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

		const validatedData = updateTaskScheduleParams.parse(await req.json())
		const validatedParams = taskScheduleIdSchema.parse({ id })

		const { taskSchedule } = await updateTaskSchedule(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(taskSchedule, { status: 200 })
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

		const validatedParams = taskScheduleIdSchema.parse({ id })
		const { taskSchedule } = await deleteTaskSchedule(validatedParams.id)

		return NextResponse.json(taskSchedule, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
