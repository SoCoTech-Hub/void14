import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	createToolMonitorRule,
	deleteToolMonitorRule,
	updateToolMonitorRule
} from '@/lib/api/toolMonitorRules/mutations'
import {
	toolMonitorRuleIdSchema,
	insertToolMonitorRuleParams,
	updateToolMonitorRuleParams
} from '@/lib/db/schema/toolMonitorRules'

export async function POST(req: Request) {
	try {
		const validatedData = insertToolMonitorRuleParams.parse(await req.json())
		const { toolMonitorRule } = await createToolMonitorRule(validatedData)

		revalidatePath('/toolMonitorRules') // optional - assumes you will have named route same as entity

		return NextResponse.json(toolMonitorRule, { status: 201 })
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

		const validatedData = updateToolMonitorRuleParams.parse(await req.json())
		const validatedParams = toolMonitorRuleIdSchema.parse({ id })

		const { toolMonitorRule } = await updateToolMonitorRule(
			validatedParams.id,
			validatedData
		)

		return NextResponse.json(toolMonitorRule, { status: 200 })
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

		const validatedParams = toolMonitorRuleIdSchema.parse({ id })
		const { toolMonitorRule } = await deleteToolMonitorRule(validatedParams.id)

		return NextResponse.json(toolMonitorRule, { status: 200 })
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json({ error: err.issues }, { status: 400 })
		}
		return NextResponse.json(err, { status: 500 })
	}
}
