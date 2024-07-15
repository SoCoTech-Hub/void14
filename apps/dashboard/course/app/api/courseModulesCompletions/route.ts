import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseModulesCompletion,
  deleteCourseModulesCompletion,
  updateCourseModulesCompletion,
} from "@soco/course-api/courseModulesCompletions/mutations";
import { 
  courseModulesCompletionIdSchema,
  insertCourseModulesCompletionParams,
  updateCourseModulesCompletionParams 
} from "@soco/course-db/schema/courseModulesCompletions";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseModulesCompletionParams.parse(await req.json());
    const { courseModulesCompletion } = await createCourseModulesCompletion(validatedData);

    revalidatePath("/courseModulesCompletions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseModulesCompletion, { status: 201 });
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

    const validatedData = updateCourseModulesCompletionParams.parse(await req.json());
    const validatedParams = courseModulesCompletionIdSchema.parse({ id });

    const { courseModulesCompletion } = await updateCourseModulesCompletion(validatedParams.id, validatedData);

    return NextResponse.json(courseModulesCompletion, { status: 200 });
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

    const validatedParams = courseModulesCompletionIdSchema.parse({ id });
    const { courseModulesCompletion } = await deleteCourseModulesCompletion(validatedParams.id);

    return NextResponse.json(courseModulesCompletion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
