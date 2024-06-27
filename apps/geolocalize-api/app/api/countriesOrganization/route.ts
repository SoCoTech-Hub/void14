import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createCountriesOrganization,
	deleteCountriesOrganization,
	updateCountriesOrganization
} from '@/lib/api/countriesOrganization/mutations'
import {
	countriesOrganizationIdSchema,
	insertCountriesOrganizationParams,
	updateCountriesOrganizationParams
} from '@/lib/db/schema/countriesOrganization'

export async function POST(req: Request) {
	try {
		const validatedData = insertCountriesOrganizationParams.parse(
			await req.json()
		)
		const { countriesOrganization } =
			await createCountriesOrganization(validatedData)

		revalidatePath('/countriesOrganization') // optional - assumes you will have named route same as entity

		return NextResponse.json(countriesOrganization, { status: 201 })
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

		const validatedData = updateCountriesOrganizationParams.parse(
			await req.json()
		)
		const validatedParams = countriesOrganizationIdSchema.parse({ id })

		const { countriesOrganization } = await updateCountriesOrganization(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(countriesOrganization, { status: 200 })
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

		const validatedParams = countriesOrganizationIdSchema.parse({ id })
		const { countriesOrganization } = await deleteCountriesOrganization(
			validatedParams.id
		)

		return NextResponse.json(countriesOrganization, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
