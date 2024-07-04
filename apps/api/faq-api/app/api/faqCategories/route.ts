import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createFaqCategory,
  deleteFaqCategory,
  updateFaqCategory,
} from "../../../lib/api/faqCategories/mutations";
import {
  faqCategoryIdSchema,
  insertFaqCategoryParams,
  updateFaqCategoryParams,
} from "../../../lib/db/schema/faqCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertFaqCategoryParams.parse(await req.json());
    const { faqCategory } = await createFaqCategory(validatedData);

    revalidatePath("/faqCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(faqCategory, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateFaqCategoryParams.parse(await req.json());
    const validatedParams = faqCategoryIdSchema.parse({ id });

    const { faqCategory } = await updateFaqCategory(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(faqCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = faqCategoryIdSchema.parse({ id });
    const { faqCategory } = await deleteFaqCategory(validatedParams.id);

    return NextResponse.json(faqCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
