import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createConfigLog,
  deleteConfigLog,
  updateConfigLog,
} from "@/lib/api/configLogs/mutations";
import { 
  configLogIdSchema,
  insertConfigLogParams,
  updateConfigLogParams 
} from "@/lib/db/schema/configLogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertConfigLogParams.parse(await req.json());
    const { configLog } = await createConfigLog(validatedData);

    revalidatePath("/configLogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(configLog, { status: 201 });
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

    const validatedData = updateConfigLogParams.parse(await req.json());
    const validatedParams = configLogIdSchema.parse({ id });

    const { configLog } = await updateConfigLog(validatedParams.id, validatedData);

    return NextResponse.json(configLog, { status: 200 });
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

    const validatedParams = configLogIdSchema.parse({ id });
    const { configLog } = await deleteConfigLog(validatedParams.id);

    return NextResponse.json(configLog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
