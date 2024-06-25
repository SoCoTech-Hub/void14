import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createBadgeIssue,
	deleteBadgeIssue,
	updateBadgeIssue
} from '@/lib/api/badgeIssues/mutations'
import {
	badgeIssueIdSchema,
	insertBadgeIssueParams,
	updateBadgeIssueParams
} from '@/lib/db/schema/badgeIssues'

export async function POST(req: Request) {
	try {
		const validatedData = insertBadgeIssueParams.parse(await req.json())
		const { badgeIssue } = await createBadgeIssue(validatedData)

		revalidatePath('/badgeIssues') // optional - assumes you will have named route same as entity

		return NextResponse.json(badgeIssue, { status: 201 })
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

		const validatedData = updateBadgeIssueParams.parse(await req.json())
		const validatedParams = badgeIssueIdSchema.parse({ id })

		const { badgeIssue } = await updateBadgeIssue(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(badgeIssue, { status: 200 })
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

		const validatedParams = badgeIssueIdSchema.parse({ id })
		const { badgeIssue } = await deleteBadgeIssue(validatedParams.id)

		return NextResponse.json(badgeIssue, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
