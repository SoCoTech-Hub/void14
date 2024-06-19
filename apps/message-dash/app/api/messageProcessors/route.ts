import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageProcessor,
  deleteMessageProcessor,
  updateMessageProcessor,
} from "@/lib/api/messageProcessors/mutations";
import { 
  messageProcessorIdSchema,
  insertMessageProcessorParams,
  updateMessageProcessorParams 
} from "@/lib/db/schema/messageProcessors";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageProcessorParams.parse(await req.json());
    const { messageProcessor } = await createMessageProcessor(validatedData);

    revalidatePath("/messageProcessors"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageProcessor, { status: 201 });
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

    const validatedData = updateMessageProcessorParams.parse(await req.json());
    const validatedParams = messageProcessorIdSchema.parse({ id });

    const { messageProcessor } = await updateMessageProcessor(validatedParams.id, validatedData);

    return NextResponse.json(messageProcessor, { status: 200 });
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

    const validatedParams = messageProcessorIdSchema.parse({ id });
    const { messageProcessor } = await deleteMessageProcessor(validatedParams.id);

    return NextResponse.json(messageProcessor, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
