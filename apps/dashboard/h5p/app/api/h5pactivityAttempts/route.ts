import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createH5pactivityAttempt,
  deleteH5pactivityAttempt,
  updateH5pactivityAttempt,
} from "@soco/h5p-api/h5pactivityAttempts/mutations";
import { 
  h5pactivityAttemptIdSchema,
  insertH5pactivityAttemptParams,
  updateH5pactivityAttemptParams 
} from "@soco/h5p-db/schema/h5pactivityAttempts";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pactivityAttemptParams.parse(await req.json());
    const { h5pactivityAttempt } = await createH5pactivityAttempt(validatedData);

    revalidatePath("/h5pactivityAttempts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5pactivityAttempt, { status: 201 });
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

    const validatedData = updateH5pactivityAttemptParams.parse(await req.json());
    const validatedParams = h5pactivityAttemptIdSchema.parse({ id });

    const { h5pactivityAttempt } = await updateH5pactivityAttempt(validatedParams.id, validatedData);

    return NextResponse.json(h5pactivityAttempt, { status: 200 });
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

    const validatedParams = h5pactivityAttemptIdSchema.parse({ id });
    const { h5pactivityAttempt } = await deleteH5pactivityAttempt(validatedParams.id);

    return NextResponse.json(h5pactivityAttempt, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
