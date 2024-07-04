import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAssignFeedbackEditpdfAnnot,
  deleteAssignFeedbackEditpdfAnnot,
  updateAssignFeedbackEditpdfAnnot,
} from "../../../lib/api/assignFeedbackEditpdfAnnots/mutations";
import {
  assignFeedbackEditpdfAnnotIdSchema,
  insertAssignFeedbackEditpdfAnnotParams,
  updateAssignFeedbackEditpdfAnnotParams,
} from "../../../lib/db/schema/assignFeedbackEditpdfAnnots";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignFeedbackEditpdfAnnotParams.parse(
      await req.json(),
    );
    const { assignFeedbackEditpdfAnnot } =
      await createAssignFeedbackEditpdfAnnot(validatedData);

    revalidatePath("/assignFeedbackEditpdfAnnots"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignFeedbackEditpdfAnnot, { status: 201 });
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

    const validatedData = updateAssignFeedbackEditpdfAnnotParams.parse(
      await req.json(),
    );
    const validatedParams = assignFeedbackEditpdfAnnotIdSchema.parse({ id });

    const { assignFeedbackEditpdfAnnot } =
      await updateAssignFeedbackEditpdfAnnot(validatedParams.id, validatedData);

    return NextResponse.json(assignFeedbackEditpdfAnnot, { status: 200 });
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

    const validatedParams = assignFeedbackEditpdfAnnotIdSchema.parse({ id });
    const { assignFeedbackEditpdfAnnot } =
      await deleteAssignFeedbackEditpdfAnnot(validatedParams.id);

    return NextResponse.json(assignFeedbackEditpdfAnnot, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
