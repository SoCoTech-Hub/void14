import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createWorkshopFormNumError,
  deleteWorkshopFormNumError,
  updateWorkshopFormNumError,
} from "../../../lib/api/workshopFormNumErrors/mutations";
import {
  insertWorkshopFormNumErrorParams,
  updateWorkshopFormNumErrorParams,
  workshopFormNumErrorIdSchema,
} from "../../../lib/db/schema/workshopFormNumErrors";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopFormNumErrorParams.parse(
      await req.json(),
    );
    const { workshopFormNumError } =
      await createWorkshopFormNumError(validatedData);

    revalidatePath("/workshopFormNumErrors"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopFormNumError, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateWorkshopFormNumErrorParams.parse(
      await req.json(),
    );
    const validatedParams = workshopFormNumErrorIdSchema.parse({ id });

    const { workshopFormNumError } = await updateWorkshopFormNumError(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(workshopFormNumError, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = workshopFormNumErrorIdSchema.parse({ id });
    const { workshopFormNumError } = await deleteWorkshopFormNumError(
      validatedParams.id,
    );

    return NextResponse.json(workshopFormNumError, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
