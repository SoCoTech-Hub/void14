import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRepository,
  deleteRepository,
  updateRepository,
} from "@/lib/api/repositories/mutations";
import { 
  repositoryIdSchema,
  insertRepositoryParams,
  updateRepositoryParams 
} from "@/lib/db/schema/repositories";

export async function POST(req: Request) {
  try {
    const validatedData = insertRepositoryParams.parse(await req.json());
    const { repository } = await createRepository(validatedData);

    revalidatePath("/repositories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(repository, { status: 201 });
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

    const validatedData = updateRepositoryParams.parse(await req.json());
    const validatedParams = repositoryIdSchema.parse({ id });

    const { repository } = await updateRepository(validatedParams.id, validatedData);

    return NextResponse.json(repository, { status: 200 });
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

    const validatedParams = repositoryIdSchema.parse({ id });
    const { repository } = await deleteRepository(validatedParams.id);

    return NextResponse.json(repository, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
