import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createShow,
  deleteShow,
  updateShow,
} from "@/lib/api/shows/mutations";
import { 
  showIdSchema,
  insertShowParams,
  updateShowParams 
} from "@/lib/db/schema/shows";

export async function POST(req: Request) {
  try {
    const validatedData = insertShowParams.parse(await req.json());
    const { show } = await createShow(validatedData);

    revalidatePath("/shows"); // optional - assumes you will have named route same as entity

    return NextResponse.json(show, { status: 201 });
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

    const validatedData = updateShowParams.parse(await req.json());
    const validatedParams = showIdSchema.parse({ id });

    const { show } = await updateShow(validatedParams.id, validatedData);

    return NextResponse.json(show, { status: 200 });
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

    const validatedParams = showIdSchema.parse({ id });
    const { show } = await deleteShow(validatedParams.id);

    return NextResponse.json(show, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
