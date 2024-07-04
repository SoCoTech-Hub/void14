import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuestionDatasetItem,
  deleteQuestionDatasetItem,
  updateQuestionDatasetItem,
} from "../../../lib/api/questionDatasetItems/mutations";
import {
  insertQuestionDatasetItemParams,
  questionDatasetItemIdSchema,
  updateQuestionDatasetItemParams,
} from "../../../lib/db/schema/questionDatasetItems";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionDatasetItemParams.parse(
      await req.json(),
    );
    const { questionDatasetItem } =
      await createQuestionDatasetItem(validatedData);

    revalidatePath("/questionDatasetItems"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionDatasetItem, { status: 201 });
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

    const validatedData = updateQuestionDatasetItemParams.parse(
      await req.json(),
    );
    const validatedParams = questionDatasetItemIdSchema.parse({ id });

    const { questionDatasetItem } = await updateQuestionDatasetItem(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(questionDatasetItem, { status: 200 });
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

    const validatedParams = questionDatasetItemIdSchema.parse({ id });
    const { questionDatasetItem } = await deleteQuestionDatasetItem(
      validatedParams.id,
    );

    return NextResponse.json(questionDatasetItem, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
