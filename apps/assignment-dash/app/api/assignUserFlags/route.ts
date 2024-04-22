import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignUserFlag,
  deleteAssignUserFlag,
  updateAssignUserFlag,
} from "@/lib/api/assignUserFlags/mutations";
import { 
  assignUserFlagIdSchema,
  insertAssignUserFlagParams,
  updateAssignUserFlagParams 
} from "@/lib/db/schema/assignUserFlags";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignUserFlagParams.parse(await req.json());
    const { assignUserFlag } = await createAssignUserFlag(validatedData);

    revalidatePath("/assignUserFlags"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignUserFlag, { status: 201 });
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

    const validatedData = updateAssignUserFlagParams.parse(await req.json());
    const validatedParams = assignUserFlagIdSchema.parse({ id });

    const { assignUserFlag } = await updateAssignUserFlag(validatedParams.id, validatedData);

    return NextResponse.json(assignUserFlag, { status: 200 });
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

    const validatedParams = assignUserFlagIdSchema.parse({ id });
    const { assignUserFlag } = await deleteAssignUserFlag(validatedParams.id);

    return NextResponse.json(assignUserFlag, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
