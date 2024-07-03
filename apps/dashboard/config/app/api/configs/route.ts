import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createConfig,
  deleteConfig,
  updateConfig,
} from "@/lib/api/configs/mutations";
import { 
  configIdSchema,
  insertConfigParams,
  updateConfigParams 
} from "@/lib/db/schema/configs";

export async function POST(req: Request) {
  try {
    const validatedData = insertConfigParams.parse(await req.json());
    const { config } = await createConfig(validatedData);

    revalidatePath("/configs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(config, { status: 201 });
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

    const validatedData = updateConfigParams.parse(await req.json());
    const validatedParams = configIdSchema.parse({ id });

    const { config } = await updateConfig(validatedParams.id, validatedData);

    return NextResponse.json(config, { status: 200 });
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

    const validatedParams = configIdSchema.parse({ id });
    const { config } = await deleteConfig(validatedParams.id);

    return NextResponse.json(config, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
