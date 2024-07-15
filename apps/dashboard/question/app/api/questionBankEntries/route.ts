import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionBankEntry,
  deleteQuestionBankEntry,
  updateQuestionBankEntry,
} from "@soco/question-api/questionBankEntries/mutations";
import { 
  questionBankEntryIdSchema,
  insertQuestionBankEntryParams,
  updateQuestionBankEntryParams 
} from "@soco/question-db/schema/questionBankEntries";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionBankEntryParams.parse(await req.json());
    const { questionBankEntry } = await createQuestionBankEntry(validatedData);

    revalidatePath("/questionBankEntries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionBankEntry, { status: 201 });
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

    const validatedData = updateQuestionBankEntryParams.parse(await req.json());
    const validatedParams = questionBankEntryIdSchema.parse({ id });

    const { questionBankEntry } = await updateQuestionBankEntry(validatedParams.id, validatedData);

    return NextResponse.json(questionBankEntry, { status: 200 });
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

    const validatedParams = questionBankEntryIdSchema.parse({ id });
    const { questionBankEntry } = await deleteQuestionBankEntry(validatedParams.id);

    return NextResponse.json(questionBankEntry, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
