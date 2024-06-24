import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradeItem,
  deleteGradeItem,
  updateGradeItem,
} from "@/lib/api/gradeItems/mutations";
import { 
  gradeItemIdSchema,
  insertGradeItemParams,
  updateGradeItemParams 
} from "@/lib/db/schema/gradeItems";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeItemParams.parse(await req.json());
    const { gradeItem } = await createGradeItem(validatedData);

    revalidatePath("/gradeItems"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradeItem, { status: 201 });
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

    const validatedData = updateGradeItemParams.parse(await req.json());
    const validatedParams = gradeItemIdSchema.parse({ id });

    const { gradeItem } = await updateGradeItem(validatedParams.id, validatedData);

    return NextResponse.json(gradeItem, { status: 200 });
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

    const validatedParams = gradeItemIdSchema.parse({ id });
    const { gradeItem } = await deleteGradeItem(validatedParams.id);

    return NextResponse.json(gradeItem, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
