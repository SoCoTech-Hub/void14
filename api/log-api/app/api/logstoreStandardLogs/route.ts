import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLogstoreStandardLog,
  deleteLogstoreStandardLog,
  updateLogstoreStandardLog,
} from "@/lib/api/logstoreStandardLogs/mutations";
import { 
  logstoreStandardLogIdSchema,
  insertLogstoreStandardLogParams,
  updateLogstoreStandardLogParams 
} from "@/lib/db/schema/logstoreStandardLogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertLogstoreStandardLogParams.parse(await req.json());
    const { logstoreStandardLog } = await createLogstoreStandardLog(validatedData);

    revalidatePath("/logstoreStandardLogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(logstoreStandardLog, { status: 201 });
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

    const validatedData = updateLogstoreStandardLogParams.parse(await req.json());
    const validatedParams = logstoreStandardLogIdSchema.parse({ id });

    const { logstoreStandardLog } = await updateLogstoreStandardLog(validatedParams.id, validatedData);

    return NextResponse.json(logstoreStandardLog, { status: 200 });
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

    const validatedParams = logstoreStandardLogIdSchema.parse({ id });
    const { logstoreStandardLog } = await deleteLogstoreStandardLog(validatedParams.id);

    return NextResponse.json(logstoreStandardLog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
