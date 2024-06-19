import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionDatasetDefinition,
  deleteQuestionDatasetDefinition,
  updateQuestionDatasetDefinition,
} from "@/lib/api/questionDatasetDefinitions/mutations";
import { 
  questionDatasetDefinitionIdSchema,
  insertQuestionDatasetDefinitionParams,
  updateQuestionDatasetDefinitionParams 
} from "@/lib/db/schema/questionDatasetDefinitions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionDatasetDefinitionParams.parse(await req.json());
    const { questionDatasetDefinition } = await createQuestionDatasetDefinition(validatedData);

    revalidatePath("/questionDatasetDefinitions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionDatasetDefinition, { status: 201 });
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

    const validatedData = updateQuestionDatasetDefinitionParams.parse(await req.json());
    const validatedParams = questionDatasetDefinitionIdSchema.parse({ id });

    const { questionDatasetDefinition } = await updateQuestionDatasetDefinition(validatedParams.id, validatedData);

    return NextResponse.json(questionDatasetDefinition, { status: 200 });
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

    const validatedParams = questionDatasetDefinitionIdSchema.parse({ id });
    const { questionDatasetDefinition } = await deleteQuestionDatasetDefinition(validatedParams.id);

    return NextResponse.json(questionDatasetDefinition, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
