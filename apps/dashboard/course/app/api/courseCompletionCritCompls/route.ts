import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseCompletionCritCompl,
  deleteCourseCompletionCritCompl,
  updateCourseCompletionCritCompl,
} from "@/lib/api/courseCompletionCritCompls/mutations";
import { 
  courseCompletionCritComplIdSchema,
  insertCourseCompletionCritComplParams,
  updateCourseCompletionCritComplParams 
} from "@/lib/db/schema/courseCompletionCritCompls";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseCompletionCritComplParams.parse(await req.json());
    const { courseCompletionCritCompl } = await createCourseCompletionCritCompl(validatedData);

    revalidatePath("/courseCompletionCritCompls"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseCompletionCritCompl, { status: 201 });
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

    const validatedData = updateCourseCompletionCritComplParams.parse(await req.json());
    const validatedParams = courseCompletionCritComplIdSchema.parse({ id });

    const { courseCompletionCritCompl } = await updateCourseCompletionCritCompl(validatedParams.id, validatedData);

    return NextResponse.json(courseCompletionCritCompl, { status: 200 });
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

    const validatedParams = courseCompletionCritComplIdSchema.parse({ id });
    const { courseCompletionCritCompl } = await deleteCourseCompletionCritCompl(validatedParams.id);

    return NextResponse.json(courseCompletionCritCompl, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
