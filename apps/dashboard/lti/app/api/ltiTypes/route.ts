import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLtiType,
  deleteLtiType,
  updateLtiType,
} from "@soco/lti-api/ltiTypes/mutations";
import { 
  ltiTypeIdSchema,
  insertLtiTypeParams,
  updateLtiTypeParams 
} from "@soco/lti-db/schema/ltiTypes";

export async function POST(req: Request) {
  try {
    const validatedData = insertLtiTypeParams.parse(await req.json());
    const { ltiType } = await createLtiType(validatedData);

    revalidatePath("/ltiTypes"); // optional - assumes you will have named route same as entity

    return NextResponse.json(ltiType, { status: 201 });
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

    const validatedData = updateLtiTypeParams.parse(await req.json());
    const validatedParams = ltiTypeIdSchema.parse({ id });

    const { ltiType } = await updateLtiType(validatedParams.id, validatedData);

    return NextResponse.json(ltiType, { status: 200 });
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

    const validatedParams = ltiTypeIdSchema.parse({ id });
    const { ltiType } = await deleteLtiType(validatedParams.id);

    return NextResponse.json(ltiType, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
