import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignFeedbackFile,
  deleteAssignFeedbackFile,
  updateAssignFeedbackFile,
} from "@/lib/api/assignFeedbackFiles/mutations";
import { 
  assignFeedbackFileIdSchema,
  insertAssignFeedbackFileParams,
  updateAssignFeedbackFileParams 
} from "@/lib/db/schema/assignFeedbackFiles";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignFeedbackFileParams.parse(await req.json());
    const { assignFeedbackFile } = await createAssignFeedbackFile(validatedData);

    revalidatePath("/assignFeedbackFiles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignFeedbackFile, { status: 201 });
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

    const validatedData = updateAssignFeedbackFileParams.parse(await req.json());
    const validatedParams = assignFeedbackFileIdSchema.parse({ id });

    const { assignFeedbackFile } = await updateAssignFeedbackFile(validatedParams.id, validatedData);

    return NextResponse.json(assignFeedbackFile, { status: 200 });
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

    const validatedParams = assignFeedbackFileIdSchema.parse({ id });
    const { assignFeedbackFile } = await deleteAssignFeedbackFile(validatedParams.id);

    return NextResponse.json(assignFeedbackFile, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
