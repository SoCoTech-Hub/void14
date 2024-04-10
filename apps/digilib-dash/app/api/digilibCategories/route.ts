import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createDigilibCategory,
  deleteDigilibCategory,
  updateDigilibCategory,
} from "@/lib/api/digilibCategories/mutations";
import { 
  digilibCategoryIdSchema,
  insertDigilibCategoryParams,
  updateDigilibCategoryParams 
} from "@/lib/db/schema/digilibCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertDigilibCategoryParams.parse(await req.json());
    const { digilibCategory } = await createDigilibCategory(validatedData);

    revalidatePath("/digilibCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(digilibCategory, { status: 201 });
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

    const validatedData = updateDigilibCategoryParams.parse(await req.json());
    const validatedParams = digilibCategoryIdSchema.parse({ id });

    const { digilibCategory } = await updateDigilibCategory(validatedParams.id, validatedData);

    return NextResponse.json(digilibCategory, { status: 200 });
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

    const validatedParams = digilibCategoryIdSchema.parse({ id });
    const { digilibCategory } = await deleteDigilibCategory(validatedParams.id);

    return NextResponse.json(digilibCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
