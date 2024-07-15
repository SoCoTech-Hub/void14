import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createExternalService,
  deleteExternalService,
  updateExternalService,
} from "@soco/external-api/externalServices/mutations";
import { 
  externalServiceIdSchema,
  insertExternalServiceParams,
  updateExternalServiceParams 
} from "@soco/external-db/schema/externalServices";

export async function POST(req: Request) {
  try {
    const validatedData = insertExternalServiceParams.parse(await req.json());
    const { externalService } = await createExternalService(validatedData);

    revalidatePath("/externalServices"); // optional - assumes you will have named route same as entity

    return NextResponse.json(externalService, { status: 201 });
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

    const validatedData = updateExternalServiceParams.parse(await req.json());
    const validatedParams = externalServiceIdSchema.parse({ id });

    const { externalService } = await updateExternalService(validatedParams.id, validatedData);

    return NextResponse.json(externalService, { status: 200 });
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

    const validatedParams = externalServiceIdSchema.parse({ id });
    const { externalService } = await deleteExternalService(validatedParams.id);

    return NextResponse.json(externalService, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
