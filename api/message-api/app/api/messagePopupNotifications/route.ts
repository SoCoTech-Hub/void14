import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createMessagePopupNotification,
	deleteMessagePopupNotification,
	updateMessagePopupNotification
} from '@/lib/api/messagePopupNotifications/mutations'
import {
	messagePopupNotificationIdSchema,
	insertMessagePopupNotificationParams,
	updateMessagePopupNotificationParams
} from '@/lib/db/schema/messagePopupNotifications'

export async function POST(req: Request) {
	try {
		const validatedData = insertMessagePopupNotificationParams.parse(
			await req.json()
		)
		const { messagePopupNotification } =
			await createMessagePopupNotification(validatedData)

		revalidatePath('/messagePopupNotifications') // optional - assumes you will have named route same as entity

		return NextResponse.json(messagePopupNotification, { status: 201 })
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

		const validatedData = updateMessagePopupNotificationParams.parse(
			await req.json()
		)
		const validatedParams = messagePopupNotificationIdSchema.parse({ id })

		const { messagePopupNotification } = await updateMessagePopupNotification(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(messagePopupNotification, { status: 200 })
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

		const validatedParams = messagePopupNotificationIdSchema.parse({ id })
		const { messagePopupNotification } = await deleteMessagePopupNotification(
			validatedParams.id
		)

		return NextResponse.json(messagePopupNotification, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
