import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBackupController,
  deleteBackupController,
  updateBackupController,
} from "@soco/backup-api/backupControllers/mutations";
import { 
  backupControllerIdSchema,
  insertBackupControllerParams,
  updateBackupControllerParams 
} from "@soco/backup-db/schema/backupControllers";

export async function POST(req: Request) {
  try {
    const validatedData = insertBackupControllerParams.parse(await req.json());
    const { backupController } = await createBackupController(validatedData);

    revalidatePath("/backupControllers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(backupController, { status: 201 });
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

    const validatedData = updateBackupControllerParams.parse(await req.json());
    const validatedParams = backupControllerIdSchema.parse({ id });

    const { backupController } = await updateBackupController(validatedParams.id, validatedData);

    return NextResponse.json(backupController, { status: 200 });
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

    const validatedParams = backupControllerIdSchema.parse({ id });
    const { backupController } = await deleteBackupController(validatedParams.id);

    return NextResponse.json(backupController, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
