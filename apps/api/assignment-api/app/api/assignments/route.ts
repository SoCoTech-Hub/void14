import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAssignment,
  deleteAssignment,
  updateAssignment,
} from "../../../lib/api/assignments/mutations";
import {
  assignmentIdSchema,
  insertAssignmentParams,
  updateAssignmentParams,
} from "../../../lib/db/schema/assignments";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignmentParams.parse(await req.json());
    const { assignment } = await createAssignment(validatedData);

    revalidatePath("/assignments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignment, { status: 201 });
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

    const validatedData = updateAssignmentParams.parse(await req.json());
    const validatedParams = assignmentIdSchema.parse({ id });

    const { assignment } = await updateAssignment(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(assignment, { status: 200 });
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

    const validatedParams = assignmentIdSchema.parse({ id });
    const { assignment } = await deleteAssignment(validatedParams.id);

    return NextResponse.json(assignment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
