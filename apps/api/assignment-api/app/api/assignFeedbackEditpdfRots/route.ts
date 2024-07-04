import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAssignFeedbackEditpdfRot,
  deleteAssignFeedbackEditpdfRot,
  updateAssignFeedbackEditpdfRot,
} from "../../../lib/api/assignFeedbackEditpdfRots/mutations";
import {
  assignFeedbackEditpdfRotIdSchema,
  insertAssignFeedbackEditpdfRotParams,
  updateAssignFeedbackEditpdfRotParams,
} from "../../../lib/db/schema/assignFeedbackEditpdfRots";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignFeedbackEditpdfRotParams.parse(
      await req.json(),
    );
    const { assignFeedbackEditpdfRot } =
      await createAssignFeedbackEditpdfRot(validatedData);

    revalidatePath("/assignFeedbackEditpdfRots"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignFeedbackEditpdfRot, { status: 201 });
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

    const validatedData = updateAssignFeedbackEditpdfRotParams.parse(
      await req.json(),
    );
    const validatedParams = assignFeedbackEditpdfRotIdSchema.parse({ id });

    const { assignFeedbackEditpdfRot } = await updateAssignFeedbackEditpdfRot(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(assignFeedbackEditpdfRot, { status: 200 });
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

    const validatedParams = assignFeedbackEditpdfRotIdSchema.parse({ id });
    const { assignFeedbackEditpdfRot } = await deleteAssignFeedbackEditpdfRot(
      validatedParams.id,
    );

    return NextResponse.json(assignFeedbackEditpdfRot, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
