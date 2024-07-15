import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionSetReference,
  deleteQuestionSetReference,
  updateQuestionSetReference,
} from "@soco/question-api/questionSetReferences/mutations";
import { 
  questionSetReferenceIdSchema,
  insertQuestionSetReferenceParams,
  updateQuestionSetReferenceParams 
} from "@soco/question-db/schema/questionSetReferences";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionSetReferenceParams.parse(await req.json());
    const { questionSetReference } = await createQuestionSetReference(validatedData);

    revalidatePath("/questionSetReferences"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionSetReference, { status: 201 });
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

    const validatedData = updateQuestionSetReferenceParams.parse(await req.json());
    const validatedParams = questionSetReferenceIdSchema.parse({ id });

    const { questionSetReference } = await updateQuestionSetReference(validatedParams.id, validatedData);

    return NextResponse.json(questionSetReference, { status: 200 });
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

    const validatedParams = questionSetReferenceIdSchema.parse({ id });
    const { questionSetReference } = await deleteQuestionSetReference(validatedParams.id);

    return NextResponse.json(questionSetReference, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
