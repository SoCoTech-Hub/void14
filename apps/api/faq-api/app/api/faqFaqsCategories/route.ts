import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createFaqFaqsCategory,
  deleteFaqFaqsCategory,
  updateFaqFaqsCategory,
} from "../../../lib/api/faqFaqsCategories/mutations";
import {
  faqFaqsCategoryIdSchema,
  insertFaqFaqsCategoryParams,
  updateFaqFaqsCategoryParams,
} from "../../../lib/db/schema/faqFaqsCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertFaqFaqsCategoryParams.parse(await req.json());
    const { faqFaqsCategory } = await createFaqFaqsCategory(validatedData);

    revalidatePath("/faqFaqsCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(faqFaqsCategory, { status: 201 });
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

    const validatedData = updateFaqFaqsCategoryParams.parse(await req.json());
    const validatedParams = faqFaqsCategoryIdSchema.parse({ id });

    const { faqFaqsCategory } = await updateFaqFaqsCategory(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(faqFaqsCategory, { status: 200 });
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

    const validatedParams = faqFaqsCategoryIdSchema.parse({ id });
    const { faqFaqsCategory } = await deleteFaqFaqsCategory(validatedParams.id);

    return NextResponse.json(faqFaqsCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
