import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignOverride,
  deleteAssignOverride,
  updateAssignOverride,
} from "@soco/assignment-api/assignOverrides/mutations";
import { 
  assignOverrideIdSchema,
  insertAssignOverrideParams,
  updateAssignOverrideParams 
} from "@soco/assignment-db/schema/assignOverrides";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignOverrideParams.parse(await req.json());
    const { assignOverride } = await createAssignOverride(validatedData);

    revalidatePath("/assignOverrides"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignOverride, { status: 201 });
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

    const validatedData = updateAssignOverrideParams.parse(await req.json());
    const validatedParams = assignOverrideIdSchema.parse({ id });

    const { assignOverride } = await updateAssignOverride(validatedParams.id, validatedData);

    return NextResponse.json(assignOverride, { status: 200 });
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

    const validatedParams = assignOverrideIdSchema.parse({ id });
    const { assignOverride } = await deleteAssignOverride(validatedParams.id);

    return NextResponse.json(assignOverride, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
