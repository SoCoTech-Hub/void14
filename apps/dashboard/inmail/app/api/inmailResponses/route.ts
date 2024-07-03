import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createInmailResponse,
  deleteInmailResponse,
  updateInmailResponse,
} from "@/lib/api/inmailResponses/mutations";
import { 
  inmailResponseIdSchema,
  insertInmailResponseParams,
  updateInmailResponseParams 
} from "@/lib/db/schema/inmailResponses";

export async function POST(req: Request) {
  try {
    const validatedData = insertInmailResponseParams.parse(await req.json());
    const { inmailResponse } = await createInmailResponse(validatedData);

    revalidatePath("/inmailResponses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(inmailResponse, { status: 201 });
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

    const validatedData = updateInmailResponseParams.parse(await req.json());
    const validatedParams = inmailResponseIdSchema.parse({ id });

    const { inmailResponse } = await updateInmailResponse(validatedParams.id, validatedData);

    return NextResponse.json(inmailResponse, { status: 200 });
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

    const validatedParams = inmailResponseIdSchema.parse({ id });
    const { inmailResponse } = await deleteInmailResponse(validatedParams.id);

    return NextResponse.json(inmailResponse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
