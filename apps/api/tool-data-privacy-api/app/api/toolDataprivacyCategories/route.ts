import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createToolDataprivacyCategory,
  deleteToolDataprivacyCategory,
  updateToolDataprivacyCategory,
} from "../../../lib/api/toolDataprivacyCategories/mutations";
import {
  insertToolDataprivacyCategoryParams,
  toolDataprivacyCategoryIdSchema,
  updateToolDataprivacyCategoryParams,
} from "../../../lib/db/schema/toolDataprivacyCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolDataprivacyCategoryParams.parse(
      await req.json(),
    );
    const { toolDataprivacyCategory } =
      await createToolDataprivacyCategory(validatedData);

    revalidatePath("/toolDataprivacyCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolDataprivacyCategory, { status: 201 });
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

    const validatedData = updateToolDataprivacyCategoryParams.parse(
      await req.json(),
    );
    const validatedParams = toolDataprivacyCategoryIdSchema.parse({ id });

    const { toolDataprivacyCategory } = await updateToolDataprivacyCategory(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(toolDataprivacyCategory, { status: 200 });
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

    const validatedParams = toolDataprivacyCategoryIdSchema.parse({ id });
    const { toolDataprivacyCategory } = await deleteToolDataprivacyCategory(
      validatedParams.id,
    );

    return NextResponse.json(toolDataprivacyCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
