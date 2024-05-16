import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopAssessment,
  deleteWorkshopAssessment,
  updateWorkshopAssessment,
} from "@/lib/api/workshopAssessments/mutations";
import { 
  workshopAssessmentIdSchema,
  insertWorkshopAssessmentParams,
  updateWorkshopAssessmentParams 
} from "@/lib/db/schema/workshopAssessments";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopAssessmentParams.parse(await req.json());
    const { workshopAssessment } = await createWorkshopAssessment(validatedData);

    revalidatePath("/workshopAssessments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopAssessment, { status: 201 });
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

    const validatedData = updateWorkshopAssessmentParams.parse(await req.json());
    const validatedParams = workshopAssessmentIdSchema.parse({ id });

    const { workshopAssessment } = await updateWorkshopAssessment(validatedParams.id, validatedData);

    return NextResponse.json(workshopAssessment, { status: 200 });
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

    const validatedParams = workshopAssessmentIdSchema.parse({ id });
    const { workshopAssessment } = await deleteWorkshopAssessment(validatedParams.id);

    return NextResponse.json(workshopAssessment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
