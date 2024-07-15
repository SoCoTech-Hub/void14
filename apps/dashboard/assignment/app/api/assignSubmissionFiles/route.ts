import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignSubmissionFile,
  deleteAssignSubmissionFile,
  updateAssignSubmissionFile,
} from "@soco/assignment-api/assignSubmissionFiles/mutations";
import { 
  assignSubmissionFileIdSchema,
  insertAssignSubmissionFileParams,
  updateAssignSubmissionFileParams 
} from "@soco/assignment-db/schema/assignSubmissionFiles";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignSubmissionFileParams.parse(await req.json());
    const { assignSubmissionFile } = await createAssignSubmissionFile(validatedData);

    revalidatePath("/assignSubmissionFiles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignSubmissionFile, { status: 201 });
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

    const validatedData = updateAssignSubmissionFileParams.parse(await req.json());
    const validatedParams = assignSubmissionFileIdSchema.parse({ id });

    const { assignSubmissionFile } = await updateAssignSubmissionFile(validatedParams.id, validatedData);

    return NextResponse.json(assignSubmissionFile, { status: 200 });
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

    const validatedParams = assignSubmissionFileIdSchema.parse({ id });
    const { assignSubmissionFile } = await deleteAssignSubmissionFile(validatedParams.id);

    return NextResponse.json(assignSubmissionFile, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
