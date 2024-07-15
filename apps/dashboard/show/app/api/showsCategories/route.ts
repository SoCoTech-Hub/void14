import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createShowsCategory,
  deleteShowsCategory,
  updateShowsCategory,
} from "@soco/show-api/showsCategories/mutations";
import { 
  showsCategoryIdSchema,
  insertShowsCategoryParams,
  updateShowsCategoryParams 
} from "@soco/show-db/schema/showsCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertShowsCategoryParams.parse(await req.json());
    const { showsCategory } = await createShowsCategory(validatedData);

    revalidatePath("/showsCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(showsCategory, { status: 201 });
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

    const validatedData = updateShowsCategoryParams.parse(await req.json());
    const validatedParams = showsCategoryIdSchema.parse({ id });

    const { showsCategory } = await updateShowsCategory(validatedParams.id, validatedData);

    return NextResponse.json(showsCategory, { status: 200 });
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

    const validatedParams = showsCategoryIdSchema.parse({ id });
    const { showsCategory } = await deleteShowsCategory(validatedParams.id);

    return NextResponse.json(showsCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
