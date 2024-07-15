import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSupportStatus,
  deleteSupportStatus,
  updateSupportStatus,
} from "@soco/support-api/supportStatuses/mutations";
import { 
  supportStatusIdSchema,
  insertSupportStatusParams,
  updateSupportStatusParams 
} from "@soco/support-db/schema/supportStatuses";

export async function POST(req: Request) {
  try {
    const validatedData = insertSupportStatusParams.parse(await req.json());
    const { supportStatus } = await createSupportStatus(validatedData);

    revalidatePath("/supportStatuses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(supportStatus, { status: 201 });
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

    const validatedData = updateSupportStatusParams.parse(await req.json());
    const validatedParams = supportStatusIdSchema.parse({ id });

    const { supportStatus } = await updateSupportStatus(validatedParams.id, validatedData);

    return NextResponse.json(supportStatus, { status: 200 });
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

    const validatedParams = supportStatusIdSchema.parse({ id });
    const { supportStatus } = await deleteSupportStatus(validatedParams.id);

    return NextResponse.json(supportStatus, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
