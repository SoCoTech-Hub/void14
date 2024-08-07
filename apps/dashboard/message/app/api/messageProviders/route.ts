import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageProvider,
  deleteMessageProvider,
  updateMessageProvider,
} from "@soco/message-api/messageProviders/mutations";
import { 
  messageProviderIdSchema,
  insertMessageProviderParams,
  updateMessageProviderParams 
} from "@soco/message-db/schema/messageProviders";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageProviderParams.parse(await req.json());
    const { messageProvider } = await createMessageProvider(validatedData);

    revalidatePath("/messageProviders"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageProvider, { status: 201 });
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

    const validatedData = updateMessageProviderParams.parse(await req.json());
    const validatedParams = messageProviderIdSchema.parse({ id });

    const { messageProvider } = await updateMessageProvider(validatedParams.id, validatedData);

    return NextResponse.json(messageProvider, { status: 200 });
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

    const validatedParams = messageProviderIdSchema.parse({ id });
    const { messageProvider } = await deleteMessageProvider(validatedParams.id);

    return NextResponse.json(messageProvider, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
