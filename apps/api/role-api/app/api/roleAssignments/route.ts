import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createRoleAssignment,
  deleteRoleAssignment,
  updateRoleAssignment,
} from "../../../lib/api/roleAssignments/mutations";
import {
  insertRoleAssignmentParams,
  roleAssignmentIdSchema,
  updateRoleAssignmentParams,
} from "../../../lib/db/schema/roleAssignments";

export async function POST(req: Request) {
  try {
    const validatedData = insertRoleAssignmentParams.parse(await req.json());
    const { roleAssignment } = await createRoleAssignment(validatedData);

    revalidatePath("/roleAssignments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(roleAssignment, { status: 201 });
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

    const validatedData = updateRoleAssignmentParams.parse(await req.json());
    const validatedParams = roleAssignmentIdSchema.parse({ id });

    const { roleAssignment } = await updateRoleAssignment(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(roleAssignment, { status: 200 });
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

    const validatedParams = roleAssignmentIdSchema.parse({ id });
    const { roleAssignment } = await deleteRoleAssignment(validatedParams.id);

    return NextResponse.json(roleAssignment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
