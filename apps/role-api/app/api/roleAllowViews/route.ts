import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createRoleAllowView,
	deleteRoleAllowView,
	updateRoleAllowView
} from '@/lib/api/roleAllowViews/mutations'
import {
	roleAllowViewIdSchema,
	insertRoleAllowViewParams,
	updateRoleAllowViewParams
} from '@/lib/db/schema/roleAllowViews'

export async function POST(req: Request) {
	try {
		const validatedData = insertRoleAllowViewParams.parse(await req.json())
		const { roleAllowView } = await createRoleAllowView(validatedData)

		revalidatePath('/roleAllowViews') // optional - assumes you will have named route same as entity

		return NextResponse.json(roleAllowView, { status: 201 })
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

		const validatedData = updateRoleAllowViewParams.parse(await req.json())
		const validatedParams = roleAllowViewIdSchema.parse({ id })

		const { roleAllowView } = await updateRoleAllowView(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(roleAllowView, { status: 200 })
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

		const validatedParams = roleAllowViewIdSchema.parse({ id })
		const { roleAllowView } = await deleteRoleAllowView(validatedParams.id)

		return NextResponse.json(roleAllowView, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
