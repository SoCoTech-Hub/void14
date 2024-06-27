import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createInfectedFile,
	deleteInfectedFile,
	updateInfectedFile
} from '@/lib/api/infectedFiles/mutations'
import {
	infectedFileIdSchema,
	insertInfectedFileParams,
	updateInfectedFileParams
} from '@/lib/db/schema/infectedFiles'

export async function POST(req: Request) {
	try {
		const validatedData = insertInfectedFileParams.parse(await req.json())
		const { infectedFile } = await createInfectedFile(validatedData)

		revalidatePath('/infectedFiles') // optional - assumes you will have named route same as entity

		return NextResponse.json(infectedFile, { status: 201 })
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

		const validatedData = updateInfectedFileParams.parse(await req.json())
		const validatedParams = infectedFileIdSchema.parse({ id })

		const { infectedFile } = await updateInfectedFile(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(infectedFile, { status: 200 })
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

		const validatedParams = infectedFileIdSchema.parse({ id })
		const { infectedFile } = await deleteInfectedFile(validatedParams.id)

		return NextResponse.json(infectedFile, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
