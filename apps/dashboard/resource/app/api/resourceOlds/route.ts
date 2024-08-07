import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createResourceOld,
  deleteResourceOld,
  updateResourceOld,
} from "@soco/resource-api/resourceOlds/mutations";
import { 
  resourceOldIdSchema,
  insertResourceOldParams,
  updateResourceOldParams 
} from "@soco/resource-db/schema/resourceOlds";

export async function POST(req: Request) {
  try {
    const validatedData = insertResourceOldParams.parse(await req.json());
    const { resourceOld } = await createResourceOld(validatedData);

    revalidatePath("/resourceOlds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(resourceOld, { status: 201 });
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

    const validatedData = updateResourceOldParams.parse(await req.json());
    const validatedParams = resourceOldIdSchema.parse({ id });

    const { resourceOld } = await updateResourceOld(validatedParams.id, validatedData);

    return NextResponse.json(resourceOld, { status: 200 });
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

    const validatedParams = resourceOldIdSchema.parse({ id });
    const { resourceOld } = await deleteResourceOld(validatedParams.id);

    return NextResponse.json(resourceOld, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
