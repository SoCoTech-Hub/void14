import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
} from "@soco/course-api/courseCategories/mutations";
import { 
  courseCategoryIdSchema,
  insertCourseCategoryParams,
  updateCourseCategoryParams 
} from "@soco/course-db/schema/courseCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseCategoryParams.parse(await req.json());
    const { courseCategory } = await createCourseCategory(validatedData);

    revalidatePath("/courseCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseCategory, { status: 201 });
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

    const validatedData = updateCourseCategoryParams.parse(await req.json());
    const validatedParams = courseCategoryIdSchema.parse({ id });

    const { courseCategory } = await updateCourseCategory(validatedParams.id, validatedData);

    return NextResponse.json(courseCategory, { status: 200 });
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

    const validatedParams = courseCategoryIdSchema.parse({ id });
    const { courseCategory } = await deleteCourseCategory(validatedParams.id);

    return NextResponse.json(courseCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
