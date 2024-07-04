import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAssignSubmissionOnlineText,
  deleteAssignSubmissionOnlineText,
  updateAssignSubmissionOnlineText,
} from "../../../lib/api/assignSubmissionOnlineTexts/mutations";
import {
  assignSubmissionOnlineTextIdSchema,
  insertAssignSubmissionOnlineTextParams,
  updateAssignSubmissionOnlineTextParams,
} from "../../../lib/db/schema/assignSubmissionOnlineTexts";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignSubmissionOnlineTextParams.parse(
      await req.json(),
    );
    const { assignSubmissionOnlineText } =
      await createAssignSubmissionOnlineText(validatedData);

    revalidatePath("/assignSubmissionOnlineTexts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignSubmissionOnlineText, { status: 201 });
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

    const validatedData = updateAssignSubmissionOnlineTextParams.parse(
      await req.json(),
    );
    const validatedParams = assignSubmissionOnlineTextIdSchema.parse({ id });

    const { assignSubmissionOnlineText } =
      await updateAssignSubmissionOnlineText(validatedParams.id, validatedData);

    return NextResponse.json(assignSubmissionOnlineText, { status: 200 });
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

    const validatedParams = assignSubmissionOnlineTextIdSchema.parse({ id });
    const { assignSubmissionOnlineText } =
      await deleteAssignSubmissionOnlineText(validatedParams.id);

    return NextResponse.json(assignSubmissionOnlineText, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
