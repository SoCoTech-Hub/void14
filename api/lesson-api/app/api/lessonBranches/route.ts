import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createLessonBranch,
	deleteLessonBranch,
	updateLessonBranch
} from '@/lib/api/lessonBranches/mutations'
import {
	lessonBranchIdSchema,
	insertLessonBranchParams,
	updateLessonBranchParams
} from '@/lib/db/schema/lessonBranches'

export async function POST(req: Request) {
	try {
		const validatedData = insertLessonBranchParams.parse(await req.json())
		const { lessonBranch } = await createLessonBranch(validatedData)

		revalidatePath('/lessonBranches') // optional - assumes you will have named route same as entity

		return NextResponse.json(lessonBranch, { status: 201 })
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

		const validatedData = updateLessonBranchParams.parse(await req.json())
		const validatedParams = lessonBranchIdSchema.parse({ id })

		const { lessonBranch } = await updateLessonBranch(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(lessonBranch, { status: 200 })
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

		const validatedParams = lessonBranchIdSchema.parse({ id })
		const { lessonBranch } = await deleteLessonBranch(validatedParams.id)

		return NextResponse.json(lessonBranch, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
