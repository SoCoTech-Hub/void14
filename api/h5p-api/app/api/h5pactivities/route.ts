import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createH5pactivity,
  deleteH5pactivity,
  updateH5pactivity,
} from "@/lib/api/h5pactivities/mutations";
import { 
  h5pactivityIdSchema,
  insertH5pactivityParams,
  updateH5pactivityParams 
} from "@/lib/db/schema/h5pactivities";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pactivityParams.parse(await req.json());
    const { h5pactivity } = await createH5pactivity(validatedData);

    revalidatePath("/h5pactivities"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5pactivity, { status: 201 });
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

    const validatedData = updateH5pactivityParams.parse(await req.json());
    const validatedParams = h5pactivityIdSchema.parse({ id });

    const { h5pactivity } = await updateH5pactivity(validatedParams.id, validatedData);

    return NextResponse.json(h5pactivity, { status: 200 });
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

    const validatedParams = h5pactivityIdSchema.parse({ id });
    const { h5pactivity } = await deleteH5pactivity(validatedParams.id);

    return NextResponse.json(h5pactivity, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
