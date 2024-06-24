import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createScormSeqRollupRule,
  deleteScormSeqRollupRule,
  updateScormSeqRollupRule,
} from "@/lib/api/scormSeqRollupRules/mutations";
import { 
  scormSeqRollupRuleIdSchema,
  insertScormSeqRollupRuleParams,
  updateScormSeqRollupRuleParams 
} from "@/lib/db/schema/scormSeqRollupRules";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormSeqRollupRuleParams.parse(await req.json());
    const { scormSeqRollupRule } = await createScormSeqRollupRule(validatedData);

    revalidatePath("/scormSeqRollupRules"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormSeqRollupRule, { status: 201 });
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

    const validatedData = updateScormSeqRollupRuleParams.parse(await req.json());
    const validatedParams = scormSeqRollupRuleIdSchema.parse({ id });

    const { scormSeqRollupRule } = await updateScormSeqRollupRule(validatedParams.id, validatedData);

    return NextResponse.json(scormSeqRollupRule, { status: 200 });
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

    const validatedParams = scormSeqRollupRuleIdSchema.parse({ id });
    const { scormSeqRollupRule } = await deleteScormSeqRollupRule(validatedParams.id);

    return NextResponse.json(scormSeqRollupRule, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
