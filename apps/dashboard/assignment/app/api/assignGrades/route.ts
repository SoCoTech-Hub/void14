import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignGrade,
  deleteAssignGrade,
  updateAssignGrade,
} from "@soco/assignment-api/assignGrades/mutations";
import { 
  assignGradeIdSchema,
  insertAssignGradeParams,
  updateAssignGradeParams 
} from "@soco/assignment-db/schema/assignGrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignGradeParams.parse(await req.json());
    const { assignGrade } = await createAssignGrade(validatedData);

    revalidatePath("/assignGrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignGrade, { status: 201 });
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

    const validatedData = updateAssignGradeParams.parse(await req.json());
    const validatedParams = assignGradeIdSchema.parse({ id });

    const { assignGrade } = await updateAssignGrade(validatedParams.id, validatedData);

    return NextResponse.json(assignGrade, { status: 200 });
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

    const validatedParams = assignGradeIdSchema.parse({ id });
    const { assignGrade } = await deleteAssignGrade(validatedParams.id);

    return NextResponse.json(assignGrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
