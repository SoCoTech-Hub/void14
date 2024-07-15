import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignFeedbackEditpdfCmnt,
  deleteAssignFeedbackEditpdfCmnt,
  updateAssignFeedbackEditpdfCmnt,
} from "@soco/assignment-api/assignFeedbackEditpdfCmnts/mutations";
import { 
  assignFeedbackEditpdfCmntIdSchema,
  insertAssignFeedbackEditpdfCmntParams,
  updateAssignFeedbackEditpdfCmntParams 
} from "@soco/assignment-db/schema/assignFeedbackEditpdfCmnts";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignFeedbackEditpdfCmntParams.parse(await req.json());
    const { assignFeedbackEditpdfCmnt } = await createAssignFeedbackEditpdfCmnt(validatedData);

    revalidatePath("/assignFeedbackEditpdfCmnts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignFeedbackEditpdfCmnt, { status: 201 });
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

    const validatedData = updateAssignFeedbackEditpdfCmntParams.parse(await req.json());
    const validatedParams = assignFeedbackEditpdfCmntIdSchema.parse({ id });

    const { assignFeedbackEditpdfCmnt } = await updateAssignFeedbackEditpdfCmnt(validatedParams.id, validatedData);

    return NextResponse.json(assignFeedbackEditpdfCmnt, { status: 200 });
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

    const validatedParams = assignFeedbackEditpdfCmntIdSchema.parse({ id });
    const { assignFeedbackEditpdfCmnt } = await deleteAssignFeedbackEditpdfCmnt(validatedParams.id);

    return NextResponse.json(assignFeedbackEditpdfCmnt, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
