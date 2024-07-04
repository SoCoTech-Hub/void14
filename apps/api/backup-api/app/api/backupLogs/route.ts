import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createBackupLog,
  deleteBackupLog,
  updateBackupLog,
} from "../../../lib/api/backupLogs/mutations";
import {
  backupLogIdSchema,
  insertBackupLogParams,
  updateBackupLogParams,
} from "../../../lib/db/schema/backupLogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertBackupLogParams.parse(await req.json());
    const { backupLog } = await createBackupLog(validatedData);

    revalidatePath("/backupLogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(backupLog, { status: 201 });
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

    const validatedData = updateBackupLogParams.parse(await req.json());
    const validatedParams = backupLogIdSchema.parse({ id });

    const { backupLog } = await updateBackupLog(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(backupLog, { status: 200 });
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

    const validatedParams = backupLogIdSchema.parse({ id });
    const { backupLog } = await deleteBackupLog(validatedParams.id);

    return NextResponse.json(backupLog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
