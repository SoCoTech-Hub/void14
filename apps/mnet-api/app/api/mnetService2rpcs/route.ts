import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMnetService2rpc,
	deleteMnetService2rpc,
	updateMnetService2rpc
} from '@/lib/api/mnetService2rpcs/mutations'
import {
	mnetService2rpcIdSchema,
	insertMnetService2rpcParams,
	updateMnetService2rpcParams
} from '@/lib/db/schema/mnetService2rpcs'

export async function POST(req: Request) {
	try {
		const validatedData = insertMnetService2rpcParams.parse(await req.json())
		const { mnetService2rpc } = await createMnetService2rpc(validatedData)

		revalidatePath('/mnetService2rpcs') // optional - assumes you will have named route same as entity

		return NextResponse.json(mnetService2rpc, { status: 201 })
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

		const validatedData = updateMnetService2rpcParams.parse(await req.json())
		const validatedParams = mnetService2rpcIdSchema.parse({ id })

		const { mnetService2rpc } = await updateMnetService2rpc(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(mnetService2rpc, { status: 200 })
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

		const validatedParams = mnetService2rpcIdSchema.parse({ id })
		const { mnetService2rpc } = await deleteMnetService2rpc(validatedParams.id)

		return NextResponse.json(mnetService2rpc, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
