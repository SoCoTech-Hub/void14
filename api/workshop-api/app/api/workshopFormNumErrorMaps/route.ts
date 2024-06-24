import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopFormNumErrorMap,
  deleteWorkshopFormNumErrorMap,
  updateWorkshopFormNumErrorMap,
} from "@/lib/api/workshopFormNumErrorMaps/mutations";
import { 
  workshopFormNumErrorMapIdSchema,
  insertWorkshopFormNumErrorMapParams,
  updateWorkshopFormNumErrorMapParams 
} from "@/lib/db/schema/workshopFormNumErrorMaps";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopFormNumErrorMapParams.parse(await req.json());
    const { workshopFormNumErrorMap } = await createWorkshopFormNumErrorMap(validatedData);

    revalidatePath("/workshopFormNumErrorMaps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopFormNumErrorMap, { status: 201 });
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

    const validatedData = updateWorkshopFormNumErrorMapParams.parse(await req.json());
    const validatedParams = workshopFormNumErrorMapIdSchema.parse({ id });

    const { workshopFormNumErrorMap } = await updateWorkshopFormNumErrorMap(validatedParams.id, validatedData);

    return NextResponse.json(workshopFormNumErrorMap, { status: 200 });
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

    const validatedParams = workshopFormNumErrorMapIdSchema.parse({ id });
    const { workshopFormNumErrorMap } = await deleteWorkshopFormNumErrorMap(validatedParams.id);

    return NextResponse.json(workshopFormNumErrorMap, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
