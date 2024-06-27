import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createScormSeqMapinfo,
	deleteScormSeqMapinfo,
	updateScormSeqMapinfo
} from '@/lib/api/scormSeqMapinfos/mutations'
import {
	scormSeqMapinfoIdSchema,
	insertScormSeqMapinfoParams,
	updateScormSeqMapinfoParams
} from '@/lib/db/schema/scormSeqMapinfos'

export async function POST(req: Request) {
	try {
		const validatedData = insertScormSeqMapinfoParams.parse(await req.json())
		const { scormSeqMapinfo } = await createScormSeqMapinfo(validatedData)

		revalidatePath('/scormSeqMapinfos') // optional - assumes you will have named route same as entity

		return NextResponse.json(scormSeqMapinfo, { status: 201 })
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

		const validatedData = updateScormSeqMapinfoParams.parse(await req.json())
		const validatedParams = scormSeqMapinfoIdSchema.parse({ id })

		const { scormSeqMapinfo } = await updateScormSeqMapinfo(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(scormSeqMapinfo, { status: 200 })
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

		const validatedParams = scormSeqMapinfoIdSchema.parse({ id })
		const { scormSeqMapinfo } = await deleteScormSeqMapinfo(validatedParams.id)

		return NextResponse.json(scormSeqMapinfo, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
