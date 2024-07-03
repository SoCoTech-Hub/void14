import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseCompletion,
  deleteCourseCompletion,
  updateCourseCompletion,
} from "@/lib/api/courseCompletions/mutations";
import { 
  courseCompletionIdSchema,
  insertCourseCompletionParams,
  updateCourseCompletionParams 
} from "@/lib/db/schema/courseCompletions";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseCompletionParams.parse(await req.json());
    const { courseCompletion } = await createCourseCompletion(validatedData);

    revalidatePath("/courseCompletions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseCompletion, { status: 201 });
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

    const validatedData = updateCourseCompletionParams.parse(await req.json());
    const validatedParams = courseCompletionIdSchema.parse({ id });

    const { courseCompletion } = await updateCourseCompletion(validatedParams.id, validatedData);

    return NextResponse.json(courseCompletion, { status: 200 });
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

    const validatedParams = courseCompletionIdSchema.parse({ id });
    const { courseCompletion } = await deleteCourseCompletion(validatedParams.id);

    return NextResponse.json(courseCompletion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
