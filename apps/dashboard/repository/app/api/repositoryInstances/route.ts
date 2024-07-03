import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRepositoryInstance,
  deleteRepositoryInstance,
  updateRepositoryInstance,
} from "@/lib/api/repositoryInstances/mutations";
import { 
  repositoryInstanceIdSchema,
  insertRepositoryInstanceParams,
  updateRepositoryInstanceParams 
} from "@/lib/db/schema/repositoryInstances";

export async function POST(req: Request) {
  try {
    const validatedData = insertRepositoryInstanceParams.parse(await req.json());
    const { repositoryInstance } = await createRepositoryInstance(validatedData);

    revalidatePath("/repositoryInstances"); // optional - assumes you will have named route same as entity

    return NextResponse.json(repositoryInstance, { status: 201 });
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

    const validatedData = updateRepositoryInstanceParams.parse(await req.json());
    const validatedParams = repositoryInstanceIdSchema.parse({ id });

    const { repositoryInstance } = await updateRepositoryInstance(validatedParams.id, validatedData);

    return NextResponse.json(repositoryInstance, { status: 200 });
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

    const validatedParams = repositoryInstanceIdSchema.parse({ id });
    const { repositoryInstance } = await deleteRepositoryInstance(validatedParams.id);

    return NextResponse.json(repositoryInstance, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
