import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { createRole, deleteRole, updateRole } from '@/lib/api/roles/mutations'
import {
	roleIdSchema,
	insertRoleParams,
	updateRoleParams
} from '@/lib/db/schema/roles'

export async function POST(req: Request) {
	try {
		const validatedData = insertRoleParams.parse(await req.json())
		const { role } = await createRole(validatedData)

		revalidatePath('/roles') // optional - assumes you will have named route same as entity

		return NextResponse.json(role, { status: 201 })
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

		const validatedData = updateRoleParams.parse(await req.json())
		const validatedParams = roleIdSchema.parse({ id })

		const { role } = await updateRole(validatedParams.id, validatedData)

		return NextResponse.json(role, { status: 200 })
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

		const validatedParams = roleIdSchema.parse({ id })
		const { role } = await deleteRole(validatedParams.id)

		return NextResponse.json(role, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
