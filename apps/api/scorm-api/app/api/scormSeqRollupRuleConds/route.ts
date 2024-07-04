import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScormSeqRollupRuleCond,
  deleteScormSeqRollupRuleCond,
  updateScormSeqRollupRuleCond,
} from "../../../lib/api/scormSeqRollupRuleConds/mutations";
import {
  insertScormSeqRollupRuleCondParams,
  scormSeqRollupRuleCondIdSchema,
  updateScormSeqRollupRuleCondParams,
} from "../../../lib/db/schema/scormSeqRollupRuleConds";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormSeqRollupRuleCondParams.parse(
      await req.json(),
    );
    const { scormSeqRollupRuleCond } =
      await createScormSeqRollupRuleCond(validatedData);

    revalidatePath("/scormSeqRollupRuleConds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormSeqRollupRuleCond, { status: 201 });
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

    const validatedData = updateScormSeqRollupRuleCondParams.parse(
      await req.json(),
    );
    const validatedParams = scormSeqRollupRuleCondIdSchema.parse({ id });

    const { scormSeqRollupRuleCond } = await updateScormSeqRollupRuleCond(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scormSeqRollupRuleCond, { status: 200 });
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

    const validatedParams = scormSeqRollupRuleCondIdSchema.parse({ id });
    const { scormSeqRollupRuleCond } = await deleteScormSeqRollupRuleCond(
      validatedParams.id,
    );

    return NextResponse.json(scormSeqRollupRuleCond, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
