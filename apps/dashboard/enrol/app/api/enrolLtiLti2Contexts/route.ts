import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiLti2Context,
  deleteEnrolLtiLti2Context,
  updateEnrolLtiLti2Context,
} from "@soco/enrol-api/enrolLtiLti2Contexts/mutations";
import { 
  enrolLtiLti2ContextIdSchema,
  insertEnrolLtiLti2ContextParams,
  updateEnrolLtiLti2ContextParams 
} from "@soco/enrol-db/schema/enrolLtiLti2Contexts";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiLti2ContextParams.parse(await req.json());
    const { enrolLtiLti2Context } = await createEnrolLtiLti2Context(validatedData);

    revalidatePath("/enrolLtiLti2Contexts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiLti2Context, { status: 201 });
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

    const validatedData = updateEnrolLtiLti2ContextParams.parse(await req.json());
    const validatedParams = enrolLtiLti2ContextIdSchema.parse({ id });

    const { enrolLtiLti2Context } = await updateEnrolLtiLti2Context(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiLti2Context, { status: 200 });
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

    const validatedParams = enrolLtiLti2ContextIdSchema.parse({ id });
    const { enrolLtiLti2Context } = await deleteEnrolLtiLti2Context(validatedParams.id);

    return NextResponse.json(enrolLtiLti2Context, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
