import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createZoomLesson,
  deleteZoomLesson,
  updateZoomLesson,
} from "@soco/zoom-api/zoomLessons/mutations";
import { 
  zoomLessonIdSchema,
  insertZoomLessonParams,
  updateZoomLessonParams 
} from "@soco/zoom-db/schema/zoomLessons";

export async function POST(req: Request) {
  try {
    const validatedData = insertZoomLessonParams.parse(await req.json());
    const { zoomLesson } = await createZoomLesson(validatedData);

    revalidatePath("/zoomLessons"); // optional - assumes you will have named route same as entity

    return NextResponse.json(zoomLesson, { status: 201 });
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

    const validatedData = updateZoomLessonParams.parse(await req.json());
    const validatedParams = zoomLessonIdSchema.parse({ id });

    const { zoomLesson } = await updateZoomLesson(validatedParams.id, validatedData);

    return NextResponse.json(zoomLesson, { status: 200 });
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

    const validatedParams = zoomLessonIdSchema.parse({ id });
    const { zoomLesson } = await deleteZoomLesson(validatedParams.id);

    return NextResponse.json(zoomLesson, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
