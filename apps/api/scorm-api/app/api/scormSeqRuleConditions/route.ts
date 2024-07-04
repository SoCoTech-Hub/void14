import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScormSeqRuleCondition,
  deleteScormSeqRuleCondition,
  updateScormSeqRuleCondition,
} from "../../../lib/api/scormSeqRuleConditions/mutations";
import {
  insertScormSeqRuleConditionParams,
  scormSeqRuleConditionIdSchema,
  updateScormSeqRuleConditionParams,
} from "../../../lib/db/schema/scormSeqRuleConditions";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormSeqRuleConditionParams.parse(
      await req.json(),
    );
    const { scormSeqRuleCondition } =
      await createScormSeqRuleCondition(validatedData);

    revalidatePath("/scormSeqRuleConditions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormSeqRuleCondition, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateScormSeqRuleConditionParams.parse(
      await req.json(),
    );
    const validatedParams = scormSeqRuleConditionIdSchema.parse({ id });

    const { scormSeqRuleCondition } = await updateScormSeqRuleCondition(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scormSeqRuleCondition, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = scormSeqRuleConditionIdSchema.parse({ id });
    const { scormSeqRuleCondition } = await deleteScormSeqRuleCondition(
      validatedParams.id,
    );

    return NextResponse.json(scormSeqRuleCondition, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
