import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourseModule,
  deleteCourseModule,
  updateCourseModule,
} from "@/lib/api/courseModules/mutations";
import { 
  courseModuleIdSchema,
  insertCourseModuleParams,
  updateCourseModuleParams 
} from "@/lib/db/schema/courseModules";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseModuleParams.parse(await req.json());
    const { courseModule } = await createCourseModule(validatedData);

    revalidatePath("/courseModules"); // optional - assumes you will have named route same as entity

    return NextResponse.json(courseModule, { status: 201 });
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

    const validatedData = updateCourseModuleParams.parse(await req.json());
    const validatedParams = courseModuleIdSchema.parse({ id });

    const { courseModule } = await updateCourseModule(validatedParams.id, validatedData);

    return NextResponse.json(courseModule, { status: 200 });
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

    const validatedParams = courseModuleIdSchema.parse({ id });
    const { courseModule } = await deleteCourseModule(validatedParams.id);

    return NextResponse.json(courseModule, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
