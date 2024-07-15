import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMessageConversation,
  deleteMessageConversation,
  updateMessageConversation,
} from "@soco/message-api/messageConversations/mutations";
import { 
  messageConversationIdSchema,
  insertMessageConversationParams,
  updateMessageConversationParams 
} from "@soco/message-db/schema/messageConversations";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageConversationParams.parse(await req.json());
    const { messageConversation } = await createMessageConversation(validatedData);

    revalidatePath("/messageConversations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageConversation, { status: 201 });
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

    const validatedData = updateMessageConversationParams.parse(await req.json());
    const validatedParams = messageConversationIdSchema.parse({ id });

    const { messageConversation } = await updateMessageConversation(validatedParams.id, validatedData);

    return NextResponse.json(messageConversation, { status: 200 });
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

    const validatedParams = messageConversationIdSchema.parse({ id });
    const { messageConversation } = await deleteMessageConversation(validatedParams.id);

    return NextResponse.json(messageConversation, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
