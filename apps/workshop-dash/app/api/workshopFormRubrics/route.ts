import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopFormRubric,
  deleteWorkshopFormRubric,
  updateWorkshopFormRubric,
} from "@/lib/api/workshopFormRubrics/mutations";
import { 
  workshopFormRubricIdSchema,
  insertWorkshopFormRubricParams,
  updateWorkshopFormRubricParams 
} from "@/lib/db/schema/workshopFormRubrics";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopFormRubricParams.parse(await req.json());
    const { workshopFormRubric } = await createWorkshopFormRubric(validatedData);

    revalidatePath("/workshopFormRubrics"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopFormRubric, { status: 201 });
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

    const validatedData = updateWorkshopFormRubricParams.parse(await req.json());
    const validatedParams = workshopFormRubricIdSchema.parse({ id });

    const { workshopFormRubric } = await updateWorkshopFormRubric(validatedParams.id, validatedData);

    return NextResponse.json(workshopFormRubric, { status: 200 });
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

    const validatedParams = workshopFormRubricIdSchema.parse({ id });
    const { workshopFormRubric } = await deleteWorkshopFormRubric(validatedParams.id);

    return NextResponse.json(workshopFormRubric, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
