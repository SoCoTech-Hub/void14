import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createData,
  deleteData,
  updateData,
} from "@soco/data-api/datas/mutations";
import { 
  dataIdSchema,
  insertDataParams,
  updateDataParams 
} from "@soco/data-db/schema/datas";

export async function POST(req: Request) {
  try {
    const validatedData = insertDataParams.parse(await req.json());
    const { data } = await createData(validatedData);

    revalidatePath("/datas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(data, { status: 201 });
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

    const validatedData = updateDataParams.parse(await req.json());
    const validatedParams = dataIdSchema.parse({ id });

    const { data } = await updateData(validatedParams.id, validatedData);

    return NextResponse.json(data, { status: 200 });
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

    const validatedParams = dataIdSchema.parse({ id });
    const { data } = await deleteData(validatedParams.id);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
