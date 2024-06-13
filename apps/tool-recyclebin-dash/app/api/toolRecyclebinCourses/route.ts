import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolRecyclebinCourse,
  deleteToolRecyclebinCourse,
  updateToolRecyclebinCourse,
} from "@/lib/api/toolRecyclebinCourses/mutations";
import { 
  toolRecyclebinCourseIdSchema,
  insertToolRecyclebinCourseParams,
  updateToolRecyclebinCourseParams 
} from "@/lib/db/schema/toolRecyclebinCourses";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolRecyclebinCourseParams.parse(await req.json());
    const { toolRecyclebinCourse } = await createToolRecyclebinCourse(validatedData);

    revalidatePath("/toolRecyclebinCourses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolRecyclebinCourse, { status: 201 });
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

    const validatedData = updateToolRecyclebinCourseParams.parse(await req.json());
    const validatedParams = toolRecyclebinCourseIdSchema.parse({ id });

    const { toolRecyclebinCourse } = await updateToolRecyclebinCourse(validatedParams.id, validatedData);

    return NextResponse.json(toolRecyclebinCourse, { status: 200 });
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

    const validatedParams = toolRecyclebinCourseIdSchema.parse({ id });
    const { toolRecyclebinCourse } = await deleteToolRecyclebinCourse(validatedParams.id);

    return NextResponse.json(toolRecyclebinCourse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
