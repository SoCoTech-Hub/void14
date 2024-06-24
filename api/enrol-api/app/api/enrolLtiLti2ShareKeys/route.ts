import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiLti2ShareKey,
  deleteEnrolLtiLti2ShareKey,
  updateEnrolLtiLti2ShareKey,
} from "@/lib/api/enrolLtiLti2ShareKeys/mutations";
import { 
  enrolLtiLti2ShareKeyIdSchema,
  insertEnrolLtiLti2ShareKeyParams,
  updateEnrolLtiLti2ShareKeyParams 
} from "@/lib/db/schema/enrolLtiLti2ShareKeys";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiLti2ShareKeyParams.parse(await req.json());
    const { enrolLtiLti2ShareKey } = await createEnrolLtiLti2ShareKey(validatedData);

    revalidatePath("/enrolLtiLti2ShareKeys"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiLti2ShareKey, { status: 201 });
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

    const validatedData = updateEnrolLtiLti2ShareKeyParams.parse(await req.json());
    const validatedParams = enrolLtiLti2ShareKeyIdSchema.parse({ id });

    const { enrolLtiLti2ShareKey } = await updateEnrolLtiLti2ShareKey(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiLti2ShareKey, { status: 200 });
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

    const validatedParams = enrolLtiLti2ShareKeyIdSchema.parse({ id });
    const { enrolLtiLti2ShareKey } = await deleteEnrolLtiLti2ShareKey(validatedParams.id);

    return NextResponse.json(enrolLtiLti2ShareKey, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
