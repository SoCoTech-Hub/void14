import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLti,
  deleteLti,
  updateLti,
} from "@soco/lti-api/ltis/mutations";
import { 
  ltiIdSchema,
  insertLtiParams,
  updateLtiParams 
} from "@soco/lti-db/schema/ltis";

export async function POST(req: Request) {
  try {
    const validatedData = insertLtiParams.parse(await req.json());
    const { lti } = await createLti(validatedData);

    revalidatePath("/ltis"); // optional - assumes you will have named route same as entity

    return NextResponse.json(lti, { status: 201 });
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

    const validatedData = updateLtiParams.parse(await req.json());
    const validatedParams = ltiIdSchema.parse({ id });

    const { lti } = await updateLti(validatedParams.id, validatedData);

    return NextResponse.json(lti, { status: 200 });
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

    const validatedParams = ltiIdSchema.parse({ id });
    const { lti } = await deleteLti(validatedParams.id);

    return NextResponse.json(lti, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
