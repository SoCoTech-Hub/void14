import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopSubmission,
  deleteWorkshopSubmission,
  updateWorkshopSubmission,
} from "@soco/workshop-api/workshopSubmissions/mutations";
import { 
  workshopSubmissionIdSchema,
  insertWorkshopSubmissionParams,
  updateWorkshopSubmissionParams 
} from "@soco/workshop-db/schema/workshopSubmissions";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopSubmissionParams.parse(await req.json());
    const { workshopSubmission } = await createWorkshopSubmission(validatedData);

    revalidatePath("/workshopSubmissions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopSubmission, { status: 201 });
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

    const validatedData = updateWorkshopSubmissionParams.parse(await req.json());
    const validatedParams = workshopSubmissionIdSchema.parse({ id });

    const { workshopSubmission } = await updateWorkshopSubmission(validatedParams.id, validatedData);

    return NextResponse.json(workshopSubmission, { status: 200 });
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

    const validatedParams = workshopSubmissionIdSchema.parse({ id });
    const { workshopSubmission } = await deleteWorkshopSubmission(validatedParams.id);

    return NextResponse.json(workshopSubmission, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
