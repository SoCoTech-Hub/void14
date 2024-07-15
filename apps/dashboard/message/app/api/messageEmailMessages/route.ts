import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageEmailMessage,
  deleteMessageEmailMessage,
  updateMessageEmailMessage,
} from "@soco/message-api/messageEmailMessages/mutations";
import { 
  messageEmailMessageIdSchema,
  insertMessageEmailMessageParams,
  updateMessageEmailMessageParams 
} from "@soco/message-db/schema/messageEmailMessages";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageEmailMessageParams.parse(await req.json());
    const { messageEmailMessage } = await createMessageEmailMessage(validatedData);

    revalidatePath("/messageEmailMessages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageEmailMessage, { status: 201 });
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

    const validatedData = updateMessageEmailMessageParams.parse(await req.json());
    const validatedParams = messageEmailMessageIdSchema.parse({ id });

    const { messageEmailMessage } = await updateMessageEmailMessage(validatedParams.id, validatedData);

    return NextResponse.json(messageEmailMessage, { status: 200 });
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

    const validatedParams = messageEmailMessageIdSchema.parse({ id });
    const { messageEmailMessage } = await deleteMessageEmailMessage(validatedParams.id);

    return NextResponse.json(messageEmailMessage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
