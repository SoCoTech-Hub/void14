import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createGrouping,
	deleteGrouping,
	updateGrouping
} from '@/lib/api/groupings/mutations'
import {
	groupingIdSchema,
	insertGroupingParams,
	updateGroupingParams
} from '@/lib/db/schema/groupings'

export async function POST(req: Request) {
	try {
		const validatedData = insertGroupingParams.parse(await req.json())
		const { grouping } = await createGrouping(validatedData)

		revalidatePath('/groupings') // optional - assumes you will have named route same as entity

		return NextResponse.json(grouping, { status: 201 })
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

		const validatedData = updateGroupingParams.parse(await req.json())
		const validatedParams = groupingIdSchema.parse({ id })

		const { grouping } = await updateGrouping(validatedParams.id, validatedData)

		return NextResponse.json(grouping, { status: 200 })
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

		const validatedParams = groupingIdSchema.parse({ id })
		const { grouping } = await deleteGrouping(validatedParams.id)

		return NextResponse.json(grouping, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
