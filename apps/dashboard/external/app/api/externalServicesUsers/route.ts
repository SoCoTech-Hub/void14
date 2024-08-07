import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createExternalServicesUser,
  deleteExternalServicesUser,
  updateExternalServicesUser,
} from "@soco/external-api/externalServicesUsers/mutations";
import { 
  externalServicesUserIdSchema,
  insertExternalServicesUserParams,
  updateExternalServicesUserParams 
} from "@soco/external-db/schema/externalServicesUsers";

export async function POST(req: Request) {
  try {
    const validatedData = insertExternalServicesUserParams.parse(await req.json());
    const { externalServicesUser } = await createExternalServicesUser(validatedData);

    revalidatePath("/externalServicesUsers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(externalServicesUser, { status: 201 });
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

    const validatedData = updateExternalServicesUserParams.parse(await req.json());
    const validatedParams = externalServicesUserIdSchema.parse({ id });

    const { externalServicesUser } = await updateExternalServicesUser(validatedParams.id, validatedData);

    return NextResponse.json(externalServicesUser, { status: 200 });
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

    const validatedParams = externalServicesUserIdSchema.parse({ id });
    const { externalServicesUser } = await deleteExternalServicesUser(validatedParams.id);

    return NextResponse.json(externalServicesUser, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
