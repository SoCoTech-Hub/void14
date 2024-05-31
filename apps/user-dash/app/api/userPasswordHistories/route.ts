import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUserPasswordHistory,
  deleteUserPasswordHistory,
  updateUserPasswordHistory,
} from "@/lib/api/userPasswordHistories/mutations";
import { 
  userPasswordHistoryIdSchema,
  insertUserPasswordHistoryParams,
  updateUserPasswordHistoryParams 
} from "@/lib/db/schema/userPasswordHistories";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserPasswordHistoryParams.parse(await req.json());
    const { userPasswordHistory } = await createUserPasswordHistory(validatedData);

    revalidatePath("/userPasswordHistories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userPasswordHistory, { status: 201 });
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

    const validatedData = updateUserPasswordHistoryParams.parse(await req.json());
    const validatedParams = userPasswordHistoryIdSchema.parse({ id });

    const { userPasswordHistory } = await updateUserPasswordHistory(validatedParams.id, validatedData);

    return NextResponse.json(userPasswordHistory, { status: 200 });
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

    const validatedParams = userPasswordHistoryIdSchema.parse({ id });
    const { userPasswordHistory } = await deleteUserPasswordHistory(validatedParams.id);

    return NextResponse.json(userPasswordHistory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
