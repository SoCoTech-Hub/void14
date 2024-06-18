import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createResource,
  deleteResource,
  updateResource,
} from "@/lib/api/resources/mutations";
import { 
  resourceIdSchema,
  insertResourceParams,
  updateResourceParams 
} from "@/lib/db/schema/resources";

export async function POST(req: Request) {
  try {
    const validatedData = insertResourceParams.parse(await req.json());
    const { resource } = await createResource(validatedData);

    revalidatePath("/resources"); // optional - assumes you will have named route same as entity

    return NextResponse.json(resource, { status: 201 });
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

    const validatedData = updateResourceParams.parse(await req.json());
    const validatedParams = resourceIdSchema.parse({ id });

    const { resource } = await updateResource(validatedParams.id, validatedData);

    return NextResponse.json(resource, { status: 200 });
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

    const validatedParams = resourceIdSchema.parse({ id });
    const { resource } = await deleteResource(validatedParams.id);

    return NextResponse.json(resource, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
