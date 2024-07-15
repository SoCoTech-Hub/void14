import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignmentSubmission,
  deleteAssignmentSubmission,
  updateAssignmentSubmission,
} from "@soco/assignment-api/assignmentSubmissions/mutations";
import { 
  assignmentSubmissionIdSchema,
  insertAssignmentSubmissionParams,
  updateAssignmentSubmissionParams 
} from "@soco/assignment-db/schema/assignmentSubmissions";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignmentSubmissionParams.parse(await req.json());
    const { assignmentSubmission } = await createAssignmentSubmission(validatedData);

    revalidatePath("/assignmentSubmissions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignmentSubmission, { status: 201 });
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

    const validatedData = updateAssignmentSubmissionParams.parse(await req.json());
    const validatedParams = assignmentSubmissionIdSchema.parse({ id });

    const { assignmentSubmission } = await updateAssignmentSubmission(validatedParams.id, validatedData);

    return NextResponse.json(assignmentSubmission, { status: 200 });
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

    const validatedParams = assignmentSubmissionIdSchema.parse({ id });
    const { assignmentSubmission } = await deleteAssignmentSubmission(validatedParams.id);

    return NextResponse.json(assignmentSubmission, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
