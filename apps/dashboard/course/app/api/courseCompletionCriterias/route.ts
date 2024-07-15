import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseCompletionCriteria,
  deleteCourseCompletionCriteria,
  updateCourseCompletionCriteria,
} from "@soco/course-api/courseCompletionCriterias/mutations";
import { 
  courseCompletionCriteriaIdSchema,
  insertCourseCompletionCriteriaParams,
  updateCourseCompletionCriteriaParams 
} from "@soco/course-db/schema/courseCompletionCriterias";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseCompletionCriteriaParams.parse(await req.json());
    const { courseCompletionCriteria } = await createCourseCompletionCriteria(validatedData);

    revalidatePath("/courseCompletionCriterias"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseCompletionCriteria, { status: 201 });
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

    const validatedData = updateCourseCompletionCriteriaParams.parse(await req.json());
    const validatedParams = courseCompletionCriteriaIdSchema.parse({ id });

    const { courseCompletionCriteria } = await updateCourseCompletionCriteria(validatedParams.id, validatedData);

    return NextResponse.json(courseCompletionCriteria, { status: 200 });
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

    const validatedParams = courseCompletionCriteriaIdSchema.parse({ id });
    const { courseCompletionCriteria } = await deleteCourseCompletionCriteria(validatedParams.id);

    return NextResponse.json(courseCompletionCriteria, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
