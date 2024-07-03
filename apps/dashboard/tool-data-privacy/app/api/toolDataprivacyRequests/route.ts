import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolDataprivacyRequest,
  deleteToolDataprivacyRequest,
  updateToolDataprivacyRequest,
} from "@/lib/api/toolDataprivacyRequests/mutations";
import { 
  toolDataprivacyRequestIdSchema,
  insertToolDataprivacyRequestParams,
  updateToolDataprivacyRequestParams 
} from "@/lib/db/schema/toolDataprivacyRequests";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolDataprivacyRequestParams.parse(await req.json());
    const { toolDataprivacyRequest } = await createToolDataprivacyRequest(validatedData);

    revalidatePath("/toolDataprivacyRequests"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolDataprivacyRequest, { status: 201 });
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

    const validatedData = updateToolDataprivacyRequestParams.parse(await req.json());
    const validatedParams = toolDataprivacyRequestIdSchema.parse({ id });

    const { toolDataprivacyRequest } = await updateToolDataprivacyRequest(validatedParams.id, validatedData);

    return NextResponse.json(toolDataprivacyRequest, { status: 200 });
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

    const validatedParams = toolDataprivacyRequestIdSchema.parse({ id });
    const { toolDataprivacyRequest } = await deleteToolDataprivacyRequest(validatedParams.id);

    return NextResponse.json(toolDataprivacyRequest, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
