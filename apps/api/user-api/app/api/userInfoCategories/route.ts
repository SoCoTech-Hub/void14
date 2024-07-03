import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createUserInfoCategory,
	deleteUserInfoCategory,
	updateUserInfoCategory
} from '@/lib/api/userInfoCategories/mutations'
import {
	userInfoCategoryIdSchema,
	insertUserInfoCategoryParams,
	updateUserInfoCategoryParams
} from '@/lib/db/schema/userInfoCategories'

export async function POST(req: Request) {
	try {
		const validatedData = insertUserInfoCategoryParams.parse(await req.json())
		const { userInfoCategory } = await createUserInfoCategory(validatedData)

		revalidatePath('/userInfoCategories') // optional - assumes you will have named route same as entity

		return NextResponse.json(userInfoCategory, { status: 201 })
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

		const validatedData = updateUserInfoCategoryParams.parse(await req.json())
		const validatedParams = userInfoCategoryIdSchema.parse({ id })

		const { userInfoCategory } = await updateUserInfoCategory(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(userInfoCategory, { status: 200 })
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

		const validatedParams = userInfoCategoryIdSchema.parse({ id })
		const { userInfoCategory } = await deleteUserInfoCategory(
			validatedParams.id
		)

		return NextResponse.json(userInfoCategory, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
