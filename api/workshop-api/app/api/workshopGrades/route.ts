import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopGrade,
  deleteWorkshopGrade,
  updateWorkshopGrade,
} from "@/lib/api/workshopGrades/mutations";
import { 
  workshopGradeIdSchema,
  insertWorkshopGradeParams,
  updateWorkshopGradeParams 
} from "@/lib/db/schema/workshopGrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopGradeParams.parse(await req.json());
    const { workshopGrade } = await createWorkshopGrade(validatedData);

    revalidatePath("/workshopGrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopGrade, { status: 201 });
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

    const validatedData = updateWorkshopGradeParams.parse(await req.json());
    const validatedParams = workshopGradeIdSchema.parse({ id });

    const { workshopGrade } = await updateWorkshopGrade(validatedParams.id, validatedData);

    return NextResponse.json(workshopGrade, { status: 200 });
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

    const validatedParams = workshopGradeIdSchema.parse({ id });
    const { workshopGrade } = await deleteWorkshopGrade(validatedParams.id);

    return NextResponse.json(workshopGrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
