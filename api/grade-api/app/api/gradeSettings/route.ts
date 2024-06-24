import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradeSetting,
  deleteGradeSetting,
  updateGradeSetting,
} from "@/lib/api/gradeSettings/mutations";
import { 
  gradeSettingIdSchema,
  insertGradeSettingParams,
  updateGradeSettingParams 
} from "@/lib/db/schema/gradeSettings";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeSettingParams.parse(await req.json());
    const { gradeSetting } = await createGradeSetting(validatedData);

    revalidatePath("/gradeSettings"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradeSetting, { status: 201 });
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

    const validatedData = updateGradeSettingParams.parse(await req.json());
    const validatedParams = gradeSettingIdSchema.parse({ id });

    const { gradeSetting } = await updateGradeSetting(validatedParams.id, validatedData);

    return NextResponse.json(gradeSetting, { status: 200 });
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

    const validatedParams = gradeSettingIdSchema.parse({ id });
    const { gradeSetting } = await deleteGradeSetting(validatedParams.id);

    return NextResponse.json(gradeSetting, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
