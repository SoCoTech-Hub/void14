import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBursaryCategory,
  deleteBursaryCategory,
  updateBursaryCategory,
} from "@soco/bursaries-api/bursaryCategories/mutations";
import { 
  bursaryCategoryIdSchema,
  insertBursaryCategoryParams,
  updateBursaryCategoryParams 
} from "@soco/bursaries-db/schema/bursaryCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertBursaryCategoryParams.parse(await req.json());
    const { bursaryCategory } = await createBursaryCategory(validatedData);

    revalidatePath("/bursaryCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(bursaryCategory, { status: 201 });
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

    const validatedData = updateBursaryCategoryParams.parse(await req.json());
    const validatedParams = bursaryCategoryIdSchema.parse({ id });

    const { bursaryCategory } = await updateBursaryCategory(validatedParams.id, validatedData);

    return NextResponse.json(bursaryCategory, { status: 200 });
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

    const validatedParams = bursaryCategoryIdSchema.parse({ id });
    const { bursaryCategory } = await deleteBursaryCategory(validatedParams.id);

    return NextResponse.json(bursaryCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
