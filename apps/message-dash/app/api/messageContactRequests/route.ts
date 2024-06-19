import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageContactRequest,
  deleteMessageContactRequest,
  updateMessageContactRequest,
} from "@/lib/api/messageContactRequests/mutations";
import { 
  messageContactRequestIdSchema,
  insertMessageContactRequestParams,
  updateMessageContactRequestParams 
} from "@/lib/db/schema/messageContactRequests";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageContactRequestParams.parse(await req.json());
    const { messageContactRequest } = await createMessageContactRequest(validatedData);

    revalidatePath("/messageContactRequests"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageContactRequest, { status: 201 });
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

    const validatedData = updateMessageContactRequestParams.parse(await req.json());
    const validatedParams = messageContactRequestIdSchema.parse({ id });

    const { messageContactRequest } = await updateMessageContactRequest(validatedParams.id, validatedData);

    return NextResponse.json(messageContactRequest, { status: 200 });
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

    const validatedParams = messageContactRequestIdSchema.parse({ id });
    const { messageContactRequest } = await deleteMessageContactRequest(validatedParams.id);

    return NextResponse.json(messageContactRequest, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
