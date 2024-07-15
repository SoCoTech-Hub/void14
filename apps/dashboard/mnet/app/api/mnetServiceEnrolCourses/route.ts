import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMnetServiceEnrolCourse,
  deleteMnetServiceEnrolCourse,
  updateMnetServiceEnrolCourse,
} from "@soco/mnet-api/mnetServiceEnrolCourses/mutations";
import { 
  mnetServiceEnrolCourseIdSchema,
  insertMnetServiceEnrolCourseParams,
  updateMnetServiceEnrolCourseParams 
} from "@soco/mnet-db/schema/mnetServiceEnrolCourses";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetServiceEnrolCourseParams.parse(await req.json());
    const { mnetServiceEnrolCourse } = await createMnetServiceEnrolCourse(validatedData);

    revalidatePath("/mnetServiceEnrolCourses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetServiceEnrolCourse, { status: 201 });
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

    const validatedData = updateMnetServiceEnrolCourseParams.parse(await req.json());
    const validatedParams = mnetServiceEnrolCourseIdSchema.parse({ id });

    const { mnetServiceEnrolCourse } = await updateMnetServiceEnrolCourse(validatedParams.id, validatedData);

    return NextResponse.json(mnetServiceEnrolCourse, { status: 200 });
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

    const validatedParams = mnetServiceEnrolCourseIdSchema.parse({ id });
    const { mnetServiceEnrolCourse } = await deleteMnetServiceEnrolCourse(validatedParams.id);

    return NextResponse.json(mnetServiceEnrolCourse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
