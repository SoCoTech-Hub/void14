import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignFeedbackComment,
  deleteAssignFeedbackComment,
  updateAssignFeedbackComment,
} from "@soco/assignment-api/assignFeedbackComments/mutations";
import { 
  assignFeedbackCommentIdSchema,
  insertAssignFeedbackCommentParams,
  updateAssignFeedbackCommentParams 
} from "@soco/assignment-db/schema/assignFeedbackComments";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignFeedbackCommentParams.parse(await req.json());
    const { assignFeedbackComment } = await createAssignFeedbackComment(validatedData);

    revalidatePath("/assignFeedbackComments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignFeedbackComment, { status: 201 });
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

    const validatedData = updateAssignFeedbackCommentParams.parse(await req.json());
    const validatedParams = assignFeedbackCommentIdSchema.parse({ id });

    const { assignFeedbackComment } = await updateAssignFeedbackComment(validatedParams.id, validatedData);

    return NextResponse.json(assignFeedbackComment, { status: 200 });
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

    const validatedParams = assignFeedbackCommentIdSchema.parse({ id });
    const { assignFeedbackComment } = await deleteAssignFeedbackComment(validatedParams.id);

    return NextResponse.json(assignFeedbackComment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
