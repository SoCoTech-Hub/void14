import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createForumGrade,
  deleteForumGrade,
  updateForumGrade,
} from "../../../lib/api/forumGrades/mutations";
import {
  forumGradeIdSchema,
  insertForumGradeParams,
  updateForumGradeParams,
} from "../../../lib/db/schema/forumGrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumGradeParams.parse(await req.json());
    const { forumGrade } = await createForumGrade(validatedData);

    revalidatePath("/forumGrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumGrade, { status: 201 });
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

    const validatedData = updateForumGradeParams.parse(await req.json());
    const validatedParams = forumGradeIdSchema.parse({ id });

    const { forumGrade } = await updateForumGrade(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(forumGrade, { status: 200 });
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

    const validatedParams = forumGradeIdSchema.parse({ id });
    const { forumGrade } = await deleteForumGrade(validatedParams.id);

    return NextResponse.json(forumGrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
