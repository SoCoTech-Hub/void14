import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionReference,
  deleteQuestionReference,
  updateQuestionReference,
} from "@/lib/api/questionReferences/mutations";
import { 
  questionReferenceIdSchema,
  insertQuestionReferenceParams,
  updateQuestionReferenceParams 
} from "@/lib/db/schema/questionReferences";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionReferenceParams.parse(await req.json());
    const { questionReference } = await createQuestionReference(validatedData);

    revalidatePath("/questionReferences"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionReference, { status: 201 });
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

    const validatedData = updateQuestionReferenceParams.parse(await req.json());
    const validatedParams = questionReferenceIdSchema.parse({ id });

    const { questionReference } = await updateQuestionReference(validatedParams.id, validatedData);

    return NextResponse.json(questionReference, { status: 200 });
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

    const validatedParams = questionReferenceIdSchema.parse({ id });
    const { questionReference } = await deleteQuestionReference(validatedParams.id);

    return NextResponse.json(questionReference, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
