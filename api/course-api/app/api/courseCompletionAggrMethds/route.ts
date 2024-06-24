import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseCompletionAggrMethd,
  deleteCourseCompletionAggrMethd,
  updateCourseCompletionAggrMethd,
} from "@/lib/api/courseCompletionAggrMethds/mutations";
import { 
  courseCompletionAggrMethdIdSchema,
  insertCourseCompletionAggrMethdParams,
  updateCourseCompletionAggrMethdParams 
} from "@/lib/db/schema/courseCompletionAggrMethds";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseCompletionAggrMethdParams.parse(await req.json());
    const { courseCompletionAggrMethd } = await createCourseCompletionAggrMethd(validatedData);

    revalidatePath("/courseCompletionAggrMethds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseCompletionAggrMethd, { status: 201 });
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

    const validatedData = updateCourseCompletionAggrMethdParams.parse(await req.json());
    const validatedParams = courseCompletionAggrMethdIdSchema.parse({ id });

    const { courseCompletionAggrMethd } = await updateCourseCompletionAggrMethd(validatedParams.id, validatedData);

    return NextResponse.json(courseCompletionAggrMethd, { status: 200 });
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

    const validatedParams = courseCompletionAggrMethdIdSchema.parse({ id });
    const { courseCompletionAggrMethd } = await deleteCourseCompletionAggrMethd(validatedParams.id);

    return NextResponse.json(courseCompletionAggrMethd, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
