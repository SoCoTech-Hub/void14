import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolRecyclebinCategory,
  deleteToolRecyclebinCategory,
  updateToolRecyclebinCategory,
} from "@/lib/api/toolRecyclebinCategories/mutations";
import { 
  toolRecyclebinCategoryIdSchema,
  insertToolRecyclebinCategoryParams,
  updateToolRecyclebinCategoryParams 
} from "@/lib/db/schema/toolRecyclebinCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolRecyclebinCategoryParams.parse(await req.json());
    const { toolRecyclebinCategory } = await createToolRecyclebinCategory(validatedData);

    revalidatePath("/toolRecyclebinCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolRecyclebinCategory, { status: 201 });
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

    const validatedData = updateToolRecyclebinCategoryParams.parse(await req.json());
    const validatedParams = toolRecyclebinCategoryIdSchema.parse({ id });

    const { toolRecyclebinCategory } = await updateToolRecyclebinCategory(validatedParams.id, validatedData);

    return NextResponse.json(toolRecyclebinCategory, { status: 200 });
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

    const validatedParams = toolRecyclebinCategoryIdSchema.parse({ id });
    const { toolRecyclebinCategory } = await deleteToolRecyclebinCategory(validatedParams.id);

    return NextResponse.json(toolRecyclebinCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
