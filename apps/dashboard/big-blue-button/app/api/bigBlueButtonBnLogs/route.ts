import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBigBlueButtonBnLog,
  deleteBigBlueButtonBnLog,
  updateBigBlueButtonBnLog,
} from "@soco/big-blue-button-api/bigBlueButtonBnLogs/mutations";
import { 
  bigBlueButtonBnLogIdSchema,
  insertBigBlueButtonBnLogParams,
  updateBigBlueButtonBnLogParams 
} from "@soco/big-blue-button-db/schema/bigBlueButtonBnLogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertBigBlueButtonBnLogParams.parse(await req.json());
    const { bigBlueButtonBnLog } = await createBigBlueButtonBnLog(validatedData);

    revalidatePath("/bigBlueButtonBnLogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(bigBlueButtonBnLog, { status: 201 });
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

    const validatedData = updateBigBlueButtonBnLogParams.parse(await req.json());
    const validatedParams = bigBlueButtonBnLogIdSchema.parse({ id });

    const { bigBlueButtonBnLog } = await updateBigBlueButtonBnLog(validatedParams.id, validatedData);

    return NextResponse.json(bigBlueButtonBnLog, { status: 200 });
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

    const validatedParams = bigBlueButtonBnLogIdSchema.parse({ id });
    const { bigBlueButtonBnLog } = await deleteBigBlueButtonBnLog(validatedParams.id);

    return NextResponse.json(bigBlueButtonBnLog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
