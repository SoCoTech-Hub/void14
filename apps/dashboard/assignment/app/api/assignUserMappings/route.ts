import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignUserMapping,
  deleteAssignUserMapping,
  updateAssignUserMapping,
} from "@soco/assignment-api/assignUserMappings/mutations";
import { 
  assignUserMappingIdSchema,
  insertAssignUserMappingParams,
  updateAssignUserMappingParams 
} from "@soco/assignment-db/schema/assignUserMappings";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignUserMappingParams.parse(await req.json());
    const { assignUserMapping } = await createAssignUserMapping(validatedData);

    revalidatePath("/assignUserMappings"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignUserMapping, { status: 201 });
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

    const validatedData = updateAssignUserMappingParams.parse(await req.json());
    const validatedParams = assignUserMappingIdSchema.parse({ id });

    const { assignUserMapping } = await updateAssignUserMapping(validatedParams.id, validatedData);

    return NextResponse.json(assignUserMapping, { status: 200 });
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

    const validatedParams = assignUserMappingIdSchema.parse({ id });
    const { assignUserMapping } = await deleteAssignUserMapping(validatedParams.id);

    return NextResponse.json(assignUserMapping, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
