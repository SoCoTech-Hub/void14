import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCompetencyUserCompCourse,
  deleteCompetencyUserCompCourse,
  updateCompetencyUserCompCourse,
} from "@/lib/api/competencyUserCompCourses/mutations";
import { 
  competencyUserCompCourseIdSchema,
  insertCompetencyUserCompCourseParams,
  updateCompetencyUserCompCourseParams 
} from "@/lib/db/schema/competencyUserCompCourses";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyUserCompCourseParams.parse(await req.json());
    const { competencyUserCompCourse } = await createCompetencyUserCompCourse(validatedData);

    revalidatePath("/competencyUserCompCourses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyUserCompCourse, { status: 201 });
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

    const validatedData = updateCompetencyUserCompCourseParams.parse(await req.json());
    const validatedParams = competencyUserCompCourseIdSchema.parse({ id });

    const { competencyUserCompCourse } = await updateCompetencyUserCompCourse(validatedParams.id, validatedData);

    return NextResponse.json(competencyUserCompCourse, { status: 200 });
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

    const validatedParams = competencyUserCompCourseIdSchema.parse({ id });
    const { competencyUserCompCourse } = await deleteCompetencyUserCompCourse(validatedParams.id);

    return NextResponse.json(competencyUserCompCourse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
