import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createSupportComment,
  deleteSupportComment,
  updateSupportComment,
} from "../../../lib/api/supportComments/mutations";
import {
  insertSupportCommentParams,
  supportCommentIdSchema,
  updateSupportCommentParams,
} from "../../../lib/db/schema/supportComments";

export async function POST(req: Request) {
  try {
    const validatedData = insertSupportCommentParams.parse(await req.json());
    const { supportComment } = await createSupportComment(validatedData);

    revalidatePath("/supportComments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(supportComment, { status: 201 });
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

    const validatedData = updateSupportCommentParams.parse(await req.json());
    const validatedParams = supportCommentIdSchema.parse({ id });

    const { supportComment } = await updateSupportComment(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(supportComment, { status: 200 });
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

    const validatedParams = supportCommentIdSchema.parse({ id });
    const { supportComment } = await deleteSupportComment(validatedParams.id);

    return NextResponse.json(supportComment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
