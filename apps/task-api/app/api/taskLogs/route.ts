import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createTaskLog,
	deleteTaskLog,
	updateTaskLog
} from '@/lib/api/taskLogs/mutations'
import {
	taskLogIdSchema,
	insertTaskLogParams,
	updateTaskLogParams
} from '@/lib/db/schema/taskLogs'

export async function POST(req: Request) {
	try {
		const validatedData = insertTaskLogParams.parse(await req.json())
		const { taskLog } = await createTaskLog(validatedData)

		revalidatePath('/taskLogs') // optional - assumes you will have named route same as entity

		return NextResponse.json(taskLog, { status: 201 })
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

		const validatedData = updateTaskLogParams.parse(await req.json())
		const validatedParams = taskLogIdSchema.parse({ id })

		const { taskLog } = await updateTaskLog(validatedParams.id, validatedData)

		return NextResponse.json(taskLog, { status: 200 })
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

		const validatedParams = taskLogIdSchema.parse({ id })
		const { taskLog } = await deleteTaskLog(validatedParams.id)

		return NextResponse.json(taskLog, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
