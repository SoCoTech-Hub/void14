import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createCourseFormatOption,
  deleteCourseFormatOption,
  updateCourseFormatOption,
} from "../../../lib/api/courseFormatOptions/mutations";
import {
  courseFormatOptionIdSchema,
  insertCourseFormatOptionParams,
  updateCourseFormatOptionParams,
} from "../../../lib/db/schema/courseFormatOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseFormatOptionParams.parse(
      await req.json(),
    );
    const { courseFormatOption } =
      await createCourseFormatOption(validatedData);

    revalidatePath("/courseFormatOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseFormatOption, { status: 201 });
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

    const validatedData = updateCourseFormatOptionParams.parse(
      await req.json(),
    );
    const validatedParams = courseFormatOptionIdSchema.parse({ id });

    const { courseFormatOption } = await updateCourseFormatOption(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(courseFormatOption, { status: 200 });
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

    const validatedParams = courseFormatOptionIdSchema.parse({ id });
    const { courseFormatOption } = await deleteCourseFormatOption(
      validatedParams.id,
    );

    return NextResponse.json(courseFormatOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
