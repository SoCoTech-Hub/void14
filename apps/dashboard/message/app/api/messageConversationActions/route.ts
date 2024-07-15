import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageConversationAction,
  deleteMessageConversationAction,
  updateMessageConversationAction,
} from "@soco/message-api/messageConversationActions/mutations";
import { 
  messageConversationActionIdSchema,
  insertMessageConversationActionParams,
  updateMessageConversationActionParams 
} from "@soco/message-db/schema/messageConversationActions";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageConversationActionParams.parse(await req.json());
    const { messageConversationAction } = await createMessageConversationAction(validatedData);

    revalidatePath("/messageConversationActions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageConversationAction, { status: 201 });
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

    const validatedData = updateMessageConversationActionParams.parse(await req.json());
    const validatedParams = messageConversationActionIdSchema.parse({ id });

    const { messageConversationAction } = await updateMessageConversationAction(validatedParams.id, validatedData);

    return NextResponse.json(messageConversationAction, { status: 200 });
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

    const validatedParams = messageConversationActionIdSchema.parse({ id });
    const { messageConversationAction } = await deleteMessageConversationAction(validatedParams.id);

    return NextResponse.json(messageConversationAction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
