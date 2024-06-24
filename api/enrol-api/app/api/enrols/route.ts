import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrol,
  deleteEnrol,
  updateEnrol,
} from "@/lib/api/enrols/mutations";
import { 
  enrolIdSchema,
  insertEnrolParams,
  updateEnrolParams 
} from "@/lib/db/schema/enrols";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolParams.parse(await req.json());
    const { enrol } = await createEnrol(validatedData);

    revalidatePath("/enrols"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrol, { status: 201 });
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

    const validatedData = updateEnrolParams.parse(await req.json());
    const validatedParams = enrolIdSchema.parse({ id });

    const { enrol } = await updateEnrol(validatedParams.id, validatedData);

    return NextResponse.json(enrol, { status: 200 });
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

    const validatedParams = enrolIdSchema.parse({ id });
    const { enrol } = await deleteEnrol(validatedParams.id);

    return NextResponse.json(enrol, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
