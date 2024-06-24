import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createApplicationCategory,
  deleteApplicationCategory,
  updateApplicationCategory,
} from "@/lib/api/applicationCategories/mutations";
import { 
  applicationCategoryIdSchema,
  insertApplicationCategoryParams,
  updateApplicationCategoryParams 
} from "@/lib/db/schema/applicationCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertApplicationCategoryParams.parse(await req.json());
    const { applicationCategory } = await createApplicationCategory(validatedData);

    revalidatePath("/applicationCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(applicationCategory, { status: 201 });
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

    const validatedData = updateApplicationCategoryParams.parse(await req.json());
    const validatedParams = applicationCategoryIdSchema.parse({ id });

    const { applicationCategory } = await updateApplicationCategory(validatedParams.id, validatedData);

    return NextResponse.json(applicationCategory, { status: 200 });
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

    const validatedParams = applicationCategoryIdSchema.parse({ id });
    const { applicationCategory } = await deleteApplicationCategory(validatedParams.id);

    return NextResponse.json(applicationCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
