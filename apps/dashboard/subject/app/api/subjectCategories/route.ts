import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSubjectCategory,
  deleteSubjectCategory,
  updateSubjectCategory,
} from "@soco/subject-api/subjectCategories/mutations";
import { 
  subjectCategoryIdSchema,
  insertSubjectCategoryParams,
  updateSubjectCategoryParams 
} from "@soco/subject-db/schema/subjectCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertSubjectCategoryParams.parse(await req.json());
    const { subjectCategory } = await createSubjectCategory(validatedData);

    revalidatePath("/subjectCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(subjectCategory, { status: 201 });
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

    const validatedData = updateSubjectCategoryParams.parse(await req.json());
    const validatedParams = subjectCategoryIdSchema.parse({ id });

    const { subjectCategory } = await updateSubjectCategory(validatedParams.id, validatedData);

    return NextResponse.json(subjectCategory, { status: 200 });
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

    const validatedParams = subjectCategoryIdSchema.parse({ id });
    const { subjectCategory } = await deleteSubjectCategory(validatedParams.id);

    return NextResponse.json(subjectCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
