import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolCustomLang,
  deleteToolCustomLang,
  updateToolCustomLang,
} from "@soco/tool-custom-lang-api/toolCustomLangs/mutations";
import { 
  toolCustomLangIdSchema,
  insertToolCustomLangParams,
  updateToolCustomLangParams 
} from "@soco/tool-custom-lang-db/schema/toolCustomLangs";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolCustomLangParams.parse(await req.json());
    const { toolCustomLang } = await createToolCustomLang(validatedData);

    revalidatePath("/toolCustomLangs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolCustomLang, { status: 201 });
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

    const validatedData = updateToolCustomLangParams.parse(await req.json());
    const validatedParams = toolCustomLangIdSchema.parse({ id });

    const { toolCustomLang } = await updateToolCustomLang(validatedParams.id, validatedData);

    return NextResponse.json(toolCustomLang, { status: 200 });
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

    const validatedParams = toolCustomLangIdSchema.parse({ id });
    const { toolCustomLang } = await deleteToolCustomLang(validatedParams.id);

    return NextResponse.json(toolCustomLang, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
