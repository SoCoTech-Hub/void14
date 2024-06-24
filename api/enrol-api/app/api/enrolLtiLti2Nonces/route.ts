import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiLti2Nonce,
  deleteEnrolLtiLti2Nonce,
  updateEnrolLtiLti2Nonce,
} from "@/lib/api/enrolLtiLti2Nonces/mutations";
import { 
  enrolLtiLti2NonceIdSchema,
  insertEnrolLtiLti2NonceParams,
  updateEnrolLtiLti2NonceParams 
} from "@/lib/db/schema/enrolLtiLti2Nonces";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiLti2NonceParams.parse(await req.json());
    const { enrolLtiLti2Nonce } = await createEnrolLtiLti2Nonce(validatedData);

    revalidatePath("/enrolLtiLti2Nonces"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiLti2Nonce, { status: 201 });
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

    const validatedData = updateEnrolLtiLti2NonceParams.parse(await req.json());
    const validatedParams = enrolLtiLti2NonceIdSchema.parse({ id });

    const { enrolLtiLti2Nonce } = await updateEnrolLtiLti2Nonce(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiLti2Nonce, { status: 200 });
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

    const validatedParams = enrolLtiLti2NonceIdSchema.parse({ id });
    const { enrolLtiLti2Nonce } = await deleteEnrolLtiLti2Nonce(validatedParams.id);

    return NextResponse.json(enrolLtiLti2Nonce, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
