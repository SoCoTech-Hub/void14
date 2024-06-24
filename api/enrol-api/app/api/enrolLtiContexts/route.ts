import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiContext,
  deleteEnrolLtiContext,
  updateEnrolLtiContext,
} from "@/lib/api/enrolLtiContexts/mutations";
import { 
  enrolLtiContextIdSchema,
  insertEnrolLtiContextParams,
  updateEnrolLtiContextParams 
} from "@/lib/db/schema/enrolLtiContexts";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiContextParams.parse(await req.json());
    const { enrolLtiContext } = await createEnrolLtiContext(validatedData);

    revalidatePath("/enrolLtiContexts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiContext, { status: 201 });
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

    const validatedData = updateEnrolLtiContextParams.parse(await req.json());
    const validatedParams = enrolLtiContextIdSchema.parse({ id });

    const { enrolLtiContext } = await updateEnrolLtiContext(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiContext, { status: 200 });
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

    const validatedParams = enrolLtiContextIdSchema.parse({ id });
    const { enrolLtiContext } = await deleteEnrolLtiContext(validatedParams.id);

    return NextResponse.json(enrolLtiContext, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
