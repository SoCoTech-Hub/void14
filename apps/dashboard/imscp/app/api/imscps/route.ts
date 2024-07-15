import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createImscp,
  deleteImscp,
  updateImscp,
} from "@soco/imscp-api/imscps/mutations";
import { 
  imscpIdSchema,
  insertImscpParams,
  updateImscpParams 
} from "@soco/imscp-db/schema/imscps";

export async function POST(req: Request) {
  try {
    const validatedData = insertImscpParams.parse(await req.json());
    const { imscp } = await createImscp(validatedData);

    revalidatePath("/imscps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(imscp, { status: 201 });
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

    const validatedData = updateImscpParams.parse(await req.json());
    const validatedParams = imscpIdSchema.parse({ id });

    const { imscp } = await updateImscp(validatedParams.id, validatedData);

    return NextResponse.json(imscp, { status: 200 });
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

    const validatedParams = imscpIdSchema.parse({ id });
    const { imscp } = await deleteImscp(validatedParams.id);

    return NextResponse.json(imscp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
