import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createCustomFieldCategory,
  deleteCustomFieldCategory,
  updateCustomFieldCategory,
} from "../../../lib/api/customFieldCategories/mutations";
import {
  customFieldCategoryIdSchema,
  insertCustomFieldCategoryParams,
  updateCustomFieldCategoryParams,
} from "../../../lib/db/schema/customFieldCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertCustomFieldCategoryParams.parse(
      await req.json(),
    );
    const { customFieldCategory } =
      await createCustomFieldCategory(validatedData);

    revalidatePath("/customFieldCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(customFieldCategory, { status: 201 });
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

    const validatedData = updateCustomFieldCategoryParams.parse(
      await req.json(),
    );
    const validatedParams = customFieldCategoryIdSchema.parse({ id });

    const { customFieldCategory } = await updateCustomFieldCategory(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(customFieldCategory, { status: 200 });
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

    const validatedParams = customFieldCategoryIdSchema.parse({ id });
    const { customFieldCategory } = await deleteCustomFieldCategory(
      validatedParams.id,
    );

    return NextResponse.json(customFieldCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
