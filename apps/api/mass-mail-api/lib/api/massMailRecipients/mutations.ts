import { db } from '@/lib/db/index'
import { and, eq } from 'drizzle-orm'
import {
	MassMailRecipientId,
	NewMassMailRecipientParams,
	UpdateMassMailRecipientParams,
	updateMassMailRecipientSchema,
	insertMassMailRecipientSchema,
	massMailRecipients,
	massMailRecipientIdSchema
} from '@/lib/db/schema/massMailRecipients'
import { getUserAuth } from '@soco/auth/utils'

export const createMassMailRecipient = async (
	massMailRecipient: NewMassMailRecipientParams
) => {
	const { session } = await getUserAuth()
	const newMassMailRecipient = insertMassMailRecipientSchema.parse({
		...massMailRecipient,
		userId: session?.user.id!
	})
	try {
		const [m] = await db
			.insert(massMailRecipients)
			.values(newMassMailRecipient)
			.returning()
		return { massMailRecipient: m }
	} catch (err) {
		const message = (err as Error).message ?? 'Error, please try again'
		console.error(message)
		throw { error: message }
	}
}

export const updateMassMailRecipient = async (
	id: MassMailRecipientId,
	massMailRecipient: UpdateMassMailRecipientParams
) => {
	const { session } = await getUserAuth()
	const { id: massMailRecipientId } = massMailRecipientIdSchema.parse({ id })
	const newMassMailRecipient = updateMassMailRecipientSchema.parse({
		...massMailRecipient,
		userId: session?.user.id!
	})
	try {
		const [m] = await db
			.update(massMailRecipients)
			.set({ ...newMassMailRecipient, updatedAt: new Date() })
			.where(
				and(
					eq(massMailRecipients.id, massMailRecipientId!),
					eq(massMailRecipients.userId, session?.user.id!)
				)
			)
			.returning()
		return { massMailRecipient: m }
	} catch (err) {
		const message = (err as Error).message ?? 'Error, please try again'
		console.error(message)
		throw { error: message }
	}
}

export const deleteMassMailRecipient = async (id: MassMailRecipientId) => {
	const { session } = await getUserAuth()
	const { id: massMailRecipientId } = massMailRecipientIdSchema.parse({ id })
	try {
		const [m] = await db
			.delete(massMailRecipients)
			.where(
				and(
					eq(massMailRecipients.id, massMailRecipientId!),
					eq(massMailRecipients.userId, session?.user.id!)
				)
			)
			.returning()
		return { massMailRecipient: m }
	} catch (err) {
		const message = (err as Error).message ?? 'Error, please try again'
		console.error(message)
		throw { error: message }
	}
}
