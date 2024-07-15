import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createScormSeqRuleCond,
  deleteScormSeqRuleCond,
  updateScormSeqRuleCond,
} from "@soco/scorm-api/scormSeqRuleConds/mutations";
import { 
  scormSeqRuleCondIdSchema,
  insertScormSeqRuleCondParams,
  updateScormSeqRuleCondParams 
} from "@soco/scorm-db/schema/scormSeqRuleConds";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormSeqRuleCondParams.parse(await req.json());
    const { scormSeqRuleCond } = await createScormSeqRuleCond(validatedData);

    revalidatePath("/scormSeqRuleConds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormSeqRuleCond, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateScormSeqRuleCondParams.parse(await req.json());
    const validatedParams = scormSeqRuleCondIdSchema.parse({ id });

    const { scormSeqRuleCond } = await updateScormSeqRuleCond(validatedParams.id, validatedData);

    return NextResponse.json(scormSeqRuleCond, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = scormSeqRuleCondIdSchema.parse({ id });
    const { scormSeqRuleCond } = await deleteScormSeqRuleCond(validatedParams.id);

    return NextResponse.json(scormSeqRuleCond, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
