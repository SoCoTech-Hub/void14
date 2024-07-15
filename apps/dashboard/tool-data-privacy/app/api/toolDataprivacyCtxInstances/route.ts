import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolDataprivacyCtxInstance,
  deleteToolDataprivacyCtxInstance,
  updateToolDataprivacyCtxInstance,
} from "@soco/tool-data-privacy-api/toolDataprivacyCtxInstances/mutations";
import { 
  toolDataprivacyCtxInstanceIdSchema,
  insertToolDataprivacyCtxInstanceParams,
  updateToolDataprivacyCtxInstanceParams 
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxInstances";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolDataprivacyCtxInstanceParams.parse(await req.json());
    const { toolDataprivacyCtxInstance } = await createToolDataprivacyCtxInstance(validatedData);

    revalidatePath("/toolDataprivacyCtxInstances"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolDataprivacyCtxInstance, { status: 201 });
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

    const validatedData = updateToolDataprivacyCtxInstanceParams.parse(await req.json());
    const validatedParams = toolDataprivacyCtxInstanceIdSchema.parse({ id });

    const { toolDataprivacyCtxInstance } = await updateToolDataprivacyCtxInstance(validatedParams.id, validatedData);

    return NextResponse.json(toolDataprivacyCtxInstance, { status: 200 });
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

    const validatedParams = toolDataprivacyCtxInstanceIdSchema.parse({ id });
    const { toolDataprivacyCtxInstance } = await deleteToolDataprivacyCtxInstance(validatedParams.id);

    return NextResponse.json(toolDataprivacyCtxInstance, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
