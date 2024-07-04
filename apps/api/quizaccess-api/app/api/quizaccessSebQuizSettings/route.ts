import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuizaccessSebQuizSetting,
  deleteQuizaccessSebQuizSetting,
  updateQuizaccessSebQuizSetting,
} from "../../../lib/api/quizaccessSebQuizSettings/mutations";
import {
  insertQuizaccessSebQuizSettingParams,
  quizaccessSebQuizSettingIdSchema,
  updateQuizaccessSebQuizSettingParams,
} from "../../../lib/db/schema/quizaccessSebQuizSettings";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizaccessSebQuizSettingParams.parse(
      await req.json(),
    );
    const { quizaccessSebQuizSetting } =
      await createQuizaccessSebQuizSetting(validatedData);

    revalidatePath("/quizaccessSebQuizSettings"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizaccessSebQuizSetting, { status: 201 });
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

    const validatedData = updateQuizaccessSebQuizSettingParams.parse(
      await req.json(),
    );
    const validatedParams = quizaccessSebQuizSettingIdSchema.parse({ id });

    const { quizaccessSebQuizSetting } = await updateQuizaccessSebQuizSetting(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(quizaccessSebQuizSetting, { status: 200 });
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

    const validatedParams = quizaccessSebQuizSettingIdSchema.parse({ id });
    const { quizaccessSebQuizSetting } = await deleteQuizaccessSebQuizSetting(
      validatedParams.id,
    );

    return NextResponse.json(quizaccessSebQuizSetting, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
