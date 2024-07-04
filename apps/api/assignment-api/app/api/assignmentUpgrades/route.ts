import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAssignmentUpgrade,
  deleteAssignmentUpgrade,
  updateAssignmentUpgrade,
} from "../../../lib/api/assignmentUpgrades/mutations";
import {
  assignmentUpgradeIdSchema,
  insertAssignmentUpgradeParams,
  updateAssignmentUpgradeParams,
} from "../../../lib/db/schema/assignmentUpgrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignmentUpgradeParams.parse(await req.json());
    const { assignmentUpgrade } = await createAssignmentUpgrade(validatedData);

    revalidatePath("/assignmentUpgrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignmentUpgrade, { status: 201 });
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

    const validatedData = updateAssignmentUpgradeParams.parse(await req.json());
    const validatedParams = assignmentUpgradeIdSchema.parse({ id });

    const { assignmentUpgrade } = await updateAssignmentUpgrade(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(assignmentUpgrade, { status: 200 });
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

    const validatedParams = assignmentUpgradeIdSchema.parse({ id });
    const { assignmentUpgrade } = await deleteAssignmentUpgrade(
      validatedParams.id,
    );

    return NextResponse.json(assignmentUpgrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
