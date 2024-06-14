import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolCustomLangComponent,
  deleteToolCustomLangComponent,
  updateToolCustomLangComponent,
} from "@/lib/api/toolCustomLangComponents/mutations";
import { 
  toolCustomLangComponentIdSchema,
  insertToolCustomLangComponentParams,
  updateToolCustomLangComponentParams 
} from "@/lib/db/schema/toolCustomLangComponents";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolCustomLangComponentParams.parse(await req.json());
    const { toolCustomLangComponent } = await createToolCustomLangComponent(validatedData);

    revalidatePath("/toolCustomLangComponents"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolCustomLangComponent, { status: 201 });
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

    const validatedData = updateToolCustomLangComponentParams.parse(await req.json());
    const validatedParams = toolCustomLangComponentIdSchema.parse({ id });

    const { toolCustomLangComponent } = await updateToolCustomLangComponent(validatedParams.id, validatedData);

    return NextResponse.json(toolCustomLangComponent, { status: 200 });
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

    const validatedParams = toolCustomLangComponentIdSchema.parse({ id });
    const { toolCustomLangComponent } = await deleteToolCustomLangComponent(validatedParams.id);

    return NextResponse.json(toolCustomLangComponent, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
