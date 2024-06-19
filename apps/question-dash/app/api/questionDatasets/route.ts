import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionDataset,
  deleteQuestionDataset,
  updateQuestionDataset,
} from "@/lib/api/questionDatasets/mutations";
import { 
  questionDatasetIdSchema,
  insertQuestionDatasetParams,
  updateQuestionDatasetParams 
} from "@/lib/db/schema/questionDatasets";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionDatasetParams.parse(await req.json());
    const { questionDataset } = await createQuestionDataset(validatedData);

    revalidatePath("/questionDatasets"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionDataset, { status: 201 });
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

    const validatedData = updateQuestionDatasetParams.parse(await req.json());
    const validatedParams = questionDatasetIdSchema.parse({ id });

    const { questionDataset } = await updateQuestionDataset(validatedParams.id, validatedData);

    return NextResponse.json(questionDataset, { status: 200 });
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

    const validatedParams = questionDatasetIdSchema.parse({ id });
    const { questionDataset } = await deleteQuestionDataset(validatedParams.id);

    return NextResponse.json(questionDataset, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
