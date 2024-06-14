import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolDataprivacyCtxExpired,
  deleteToolDataprivacyCtxExpired,
  updateToolDataprivacyCtxExpired,
} from "@/lib/api/toolDataprivacyCtxExpireds/mutations";
import { 
  toolDataprivacyCtxExpiredIdSchema,
  insertToolDataprivacyCtxExpiredParams,
  updateToolDataprivacyCtxExpiredParams 
} from "@/lib/db/schema/toolDataprivacyCtxExpireds";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolDataprivacyCtxExpiredParams.parse(await req.json());
    const { toolDataprivacyCtxExpired } = await createToolDataprivacyCtxExpired(validatedData);

    revalidatePath("/toolDataprivacyCtxExpireds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolDataprivacyCtxExpired, { status: 201 });
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

    const validatedData = updateToolDataprivacyCtxExpiredParams.parse(await req.json());
    const validatedParams = toolDataprivacyCtxExpiredIdSchema.parse({ id });

    const { toolDataprivacyCtxExpired } = await updateToolDataprivacyCtxExpired(validatedParams.id, validatedData);

    return NextResponse.json(toolDataprivacyCtxExpired, { status: 200 });
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

    const validatedParams = toolDataprivacyCtxExpiredIdSchema.parse({ id });
    const { toolDataprivacyCtxExpired } = await deleteToolDataprivacyCtxExpired(validatedParams.id);

    return NextResponse.json(toolDataprivacyCtxExpired, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
