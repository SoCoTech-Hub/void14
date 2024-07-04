import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuestionUsage,
  deleteQuestionUsage,
  updateQuestionUsage,
} from "../../../lib/api/questionUsages/mutations";
import {
  insertQuestionUsageParams,
  questionUsageIdSchema,
  updateQuestionUsageParams,
} from "../../../lib/db/schema/questionUsages";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionUsageParams.parse(await req.json());
    const { questionUsage } = await createQuestionUsage(validatedData);

    revalidatePath("/questionUsages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionUsage, { status: 201 });
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

    const validatedData = updateQuestionUsageParams.parse(await req.json());
    const validatedParams = questionUsageIdSchema.parse({ id });

    const { questionUsage } = await updateQuestionUsage(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(questionUsage, { status: 200 });
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

    const validatedParams = questionUsageIdSchema.parse({ id });
    const { questionUsage } = await deleteQuestionUsage(validatedParams.id);

    return NextResponse.json(questionUsage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
