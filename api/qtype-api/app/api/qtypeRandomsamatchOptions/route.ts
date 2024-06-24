import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeRandomsamatchOption,
  deleteQtypeRandomsamatchOption,
  updateQtypeRandomsamatchOption,
} from "@/lib/api/qtypeRandomsamatchOptions/mutations";
import { 
  qtypeRandomsamatchOptionIdSchema,
  insertQtypeRandomsamatchOptionParams,
  updateQtypeRandomsamatchOptionParams 
} from "@/lib/db/schema/qtypeRandomsamatchOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeRandomsamatchOptionParams.parse(await req.json());
    const { qtypeRandomsamatchOption } = await createQtypeRandomsamatchOption(validatedData);

    revalidatePath("/qtypeRandomsamatchOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeRandomsamatchOption, { status: 201 });
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

    const validatedData = updateQtypeRandomsamatchOptionParams.parse(await req.json());
    const validatedParams = qtypeRandomsamatchOptionIdSchema.parse({ id });

    const { qtypeRandomsamatchOption } = await updateQtypeRandomsamatchOption(validatedParams.id, validatedData);

    return NextResponse.json(qtypeRandomsamatchOption, { status: 200 });
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

    const validatedParams = qtypeRandomsamatchOptionIdSchema.parse({ id });
    const { qtypeRandomsamatchOption } = await deleteQtypeRandomsamatchOption(validatedParams.id);

    return NextResponse.json(qtypeRandomsamatchOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
