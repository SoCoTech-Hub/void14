import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createPortfolioInstance,
	deletePortfolioInstance,
	updatePortfolioInstance
} from '@/lib/api/portfolioInstances/mutations'
import {
	portfolioInstanceIdSchema,
	insertPortfolioInstanceParams,
	updatePortfolioInstanceParams
} from '@/lib/db/schema/portfolioInstances'

export async function POST(req: Request) {
	try {
		const validatedData = insertPortfolioInstanceParams.parse(await req.json())
		const { portfolioInstance } = await createPortfolioInstance(validatedData)

		revalidatePath('/portfolioInstances') // optional - assumes you will have named route same as entity

		return NextResponse.json(portfolioInstance, { status: 201 })
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

		const validatedData = updatePortfolioInstanceParams.parse(await req.json())
		const validatedParams = portfolioInstanceIdSchema.parse({ id })

		const { portfolioInstance } = await updatePortfolioInstance(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(portfolioInstance, { status: 200 })
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

		const validatedParams = portfolioInstanceIdSchema.parse({ id })
		const { portfolioInstance } = await deletePortfolioInstance(
			validatedParams.id
		)

		return NextResponse.json(portfolioInstance, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
