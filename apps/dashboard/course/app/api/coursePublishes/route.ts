import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCoursePublish,
  deleteCoursePublish,
  updateCoursePublish,
} from "@soco/course-api/coursePublishes/mutations";
import { 
  coursePublishIdSchema,
  insertCoursePublishParams,
  updateCoursePublishParams 
} from "@soco/course-db/schema/coursePublishes";

export async function POST(req: Request) {
  try {
    const validatedData = insertCoursePublishParams.parse(await req.json());
    const { coursePublish } = await createCoursePublish(validatedData);

    revalidatePath("/coursePublishes"); // optional - assumes you will have named route same as entity

    return NextResponse.json(coursePublish, { status: 201 });
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

    const validatedData = updateCoursePublishParams.parse(await req.json());
    const validatedParams = coursePublishIdSchema.parse({ id });

    const { coursePublish } = await updateCoursePublish(validatedParams.id, validatedData);

    return NextResponse.json(coursePublish, { status: 200 });
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

    const validatedParams = coursePublishIdSchema.parse({ id });
    const { coursePublish } = await deleteCoursePublish(validatedParams.id);

    return NextResponse.json(coursePublish, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
