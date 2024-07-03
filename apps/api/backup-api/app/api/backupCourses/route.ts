import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBackupCourse,
	deleteBackupCourse,
	updateBackupCourse
} from '@/lib/api/backupCourses/mutations'
import {
	backupCourseIdSchema,
	insertBackupCourseParams,
	updateBackupCourseParams
} from '@/lib/db/schema/backupCourses'

export async function POST(req: Request) {
	try {
		const validatedData = insertBackupCourseParams.parse(await req.json())
		const { backupCourse } = await createBackupCourse(validatedData)

		revalidatePath('/backupCourses') // optional - assumes you will have named route same as entity

		return NextResponse.json(backupCourse, { status: 201 })
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

		const validatedData = updateBackupCourseParams.parse(await req.json())
		const validatedParams = backupCourseIdSchema.parse({ id })

		const { backupCourse } = await updateBackupCourse(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(backupCourse, { status: 200 })
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

		const validatedParams = backupCourseIdSchema.parse({ id })
		const { backupCourse } = await deleteBackupCourse(validatedParams.id)

		return NextResponse.json(backupCourse, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
