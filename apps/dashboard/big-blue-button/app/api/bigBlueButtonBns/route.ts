import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBigBlueButtonBn,
  deleteBigBlueButtonBn,
  updateBigBlueButtonBn,
} from "@/lib/api/bigBlueButtonBns/mutations";
import { 
  bigBlueButtonBnIdSchema,
  insertBigBlueButtonBnParams,
  updateBigBlueButtonBnParams 
} from "@/lib/db/schema/bigBlueButtonBns";

export async function POST(req: Request) {
  try {
    const validatedData = insertBigBlueButtonBnParams.parse(await req.json());
    const { bigBlueButtonBn } = await createBigBlueButtonBn(validatedData);

    revalidatePath("/bigBlueButtonBns"); // optional - assumes you will have named route same as entity

    return NextResponse.json(bigBlueButtonBn, { status: 201 });
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

    const validatedData = updateBigBlueButtonBnParams.parse(await req.json());
    const validatedParams = bigBlueButtonBnIdSchema.parse({ id });

    const { bigBlueButtonBn } = await updateBigBlueButtonBn(validatedParams.id, validatedData);

    return NextResponse.json(bigBlueButtonBn, { status: 200 });
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

    const validatedParams = bigBlueButtonBnIdSchema.parse({ id });
    const { bigBlueButtonBn } = await deleteBigBlueButtonBn(validatedParams.id);

    return NextResponse.json(bigBlueButtonBn, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
