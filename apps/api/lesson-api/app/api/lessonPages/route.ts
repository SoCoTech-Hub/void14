import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createLessonPage,
  deleteLessonPage,
  updateLessonPage,
} from "../../../lib/api/lessonPages/mutations";
import {
  insertLessonPageParams,
  lessonPageIdSchema,
  updateLessonPageParams,
} from "../../../lib/db/schema/lessonPages";

export async function POST(req: Request) {
  try {
    const validatedData = insertLessonPageParams.parse(await req.json());
    const { lessonPage } = await createLessonPage(validatedData);

    revalidatePath("/lessonPages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(lessonPage, { status: 201 });
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

    const validatedData = updateLessonPageParams.parse(await req.json());
    const validatedParams = lessonPageIdSchema.parse({ id });

    const { lessonPage } = await updateLessonPage(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(lessonPage, { status: 200 });
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

    const validatedParams = lessonPageIdSchema.parse({ id });
    const { lessonPage } = await deleteLessonPage(validatedParams.id);

    return NextResponse.json(lessonPage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
