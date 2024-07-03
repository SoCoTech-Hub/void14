import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopFormRubricConfig,
  deleteWorkshopFormRubricConfig,
  updateWorkshopFormRubricConfig,
} from "@/lib/api/workshopFormRubricConfigs/mutations";
import { 
  workshopFormRubricConfigIdSchema,
  insertWorkshopFormRubricConfigParams,
  updateWorkshopFormRubricConfigParams 
} from "@/lib/db/schema/workshopFormRubricConfigs";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopFormRubricConfigParams.parse(await req.json());
    const { workshopFormRubricConfig } = await createWorkshopFormRubricConfig(validatedData);

    revalidatePath("/workshopFormRubricConfigs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopFormRubricConfig, { status: 201 });
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

    const validatedData = updateWorkshopFormRubricConfigParams.parse(await req.json());
    const validatedParams = workshopFormRubricConfigIdSchema.parse({ id });

    const { workshopFormRubricConfig } = await updateWorkshopFormRubricConfig(validatedParams.id, validatedData);

    return NextResponse.json(workshopFormRubricConfig, { status: 200 });
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

    const validatedParams = workshopFormRubricConfigIdSchema.parse({ id });
    const { workshopFormRubricConfig } = await deleteWorkshopFormRubricConfig(validatedParams.id);

    return NextResponse.json(workshopFormRubricConfig, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
