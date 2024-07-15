import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolUserToursTour,
  deleteToolUserToursTour,
  updateToolUserToursTour,
} from "@soco/tool-user-tours-api/toolUserToursTours/mutations";
import { 
  toolUserToursTourIdSchema,
  insertToolUserToursTourParams,
  updateToolUserToursTourParams 
} from "@soco/tool-user-tours-db/schema/toolUserToursTours";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolUserToursTourParams.parse(await req.json());
    const { toolUserToursTour } = await createToolUserToursTour(validatedData);

    revalidatePath("/toolUserToursTours"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolUserToursTour, { status: 201 });
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

    const validatedData = updateToolUserToursTourParams.parse(await req.json());
    const validatedParams = toolUserToursTourIdSchema.parse({ id });

    const { toolUserToursTour } = await updateToolUserToursTour(validatedParams.id, validatedData);

    return NextResponse.json(toolUserToursTour, { status: 200 });
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

    const validatedParams = toolUserToursTourIdSchema.parse({ id });
    const { toolUserToursTour } = await deleteToolUserToursTour(validatedParams.id);

    return NextResponse.json(toolUserToursTour, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
