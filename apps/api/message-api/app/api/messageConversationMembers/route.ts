import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createMessageConversationMember,
  deleteMessageConversationMember,
  updateMessageConversationMember,
} from "../../../lib/api/messageConversationMembers/mutations";
import {
  insertMessageConversationMemberParams,
  messageConversationMemberIdSchema,
  updateMessageConversationMemberParams,
} from "../../../lib/db/schema/messageConversationMembers";

export async function POST(req: Request) {
  try {
    const validatedData = insertMessageConversationMemberParams.parse(
      await req.json(),
    );
    const { messageConversationMember } =
      await createMessageConversationMember(validatedData);

    revalidatePath("/messageConversationMembers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(messageConversationMember, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateMessageConversationMemberParams.parse(
      await req.json(),
    );
    const validatedParams = messageConversationMemberIdSchema.parse({ id });

    const { messageConversationMember } = await updateMessageConversationMember(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(messageConversationMember, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = messageConversationMemberIdSchema.parse({ id });
    const { messageConversationMember } = await deleteMessageConversationMember(
      validatedParams.id,
    );

    return NextResponse.json(messageConversationMember, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
