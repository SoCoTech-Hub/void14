import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionVersion,
  deleteQuestionVersion,
  updateQuestionVersion,
} from "@/lib/api/questionVersions/mutations";
import { 
  questionVersionIdSchema,
  insertQuestionVersionParams,
  updateQuestionVersionParams 
} from "@/lib/db/schema/questionVersions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionVersionParams.parse(await req.json());
    const { questionVersion } = await createQuestionVersion(validatedData);

    revalidatePath("/questionVersions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionVersion, { status: 201 });
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

    const validatedData = updateQuestionVersionParams.parse(await req.json());
    const validatedParams = questionVersionIdSchema.parse({ id });

    const { questionVersion } = await updateQuestionVersion(validatedParams.id, validatedData);

    return NextResponse.json(questionVersion, { status: 200 });
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

    const validatedParams = questionVersionIdSchema.parse({ id });
    const { questionVersion } = await deleteQuestionVersion(validatedParams.id);

    return NextResponse.json(questionVersion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
