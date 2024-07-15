import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignFeedbackEditpdfQuick,
  deleteAssignFeedbackEditpdfQuick,
  updateAssignFeedbackEditpdfQuick,
} from "@soco/assignment-api/assignFeedbackEditpdfQuicks/mutations";
import { 
  assignFeedbackEditpdfQuickIdSchema,
  insertAssignFeedbackEditpdfQuickParams,
  updateAssignFeedbackEditpdfQuickParams 
} from "@soco/assignment-db/schema/assignFeedbackEditpdfQuicks";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignFeedbackEditpdfQuickParams.parse(await req.json());
    const { assignFeedbackEditpdfQuick } = await createAssignFeedbackEditpdfQuick(validatedData);

    revalidatePath("/assignFeedbackEditpdfQuicks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignFeedbackEditpdfQuick, { status: 201 });
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

    const validatedData = updateAssignFeedbackEditpdfQuickParams.parse(await req.json());
    const validatedParams = assignFeedbackEditpdfQuickIdSchema.parse({ id });

    const { assignFeedbackEditpdfQuick } = await updateAssignFeedbackEditpdfQuick(validatedParams.id, validatedData);

    return NextResponse.json(assignFeedbackEditpdfQuick, { status: 200 });
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

    const validatedParams = assignFeedbackEditpdfQuickIdSchema.parse({ id });
    const { assignFeedbackEditpdfQuick } = await deleteAssignFeedbackEditpdfQuick(validatedParams.id);

    return NextResponse.json(assignFeedbackEditpdfQuick, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
