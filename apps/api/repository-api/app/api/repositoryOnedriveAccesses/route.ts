import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createRepositoryOnedriveAccess,
  deleteRepositoryOnedriveAccess,
  updateRepositoryOnedriveAccess,
} from "../../../lib/api/repositoryOnedriveAccesses/mutations";
import {
  insertRepositoryOnedriveAccessParams,
  repositoryOnedriveAccessIdSchema,
  updateRepositoryOnedriveAccessParams,
} from "../../../lib/db/schema/repositoryOnedriveAccesses";

export async function POST(req: Request) {
  try {
    const validatedData = insertRepositoryOnedriveAccessParams.parse(
      await req.json(),
    );
    const { repositoryOnedriveAccess } =
      await createRepositoryOnedriveAccess(validatedData);

    revalidatePath("/repositoryOnedriveAccesses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(repositoryOnedriveAccess, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateRepositoryOnedriveAccessParams.parse(
      await req.json(),
    );
    const validatedParams = repositoryOnedriveAccessIdSchema.parse({ id });

    const { repositoryOnedriveAccess } = await updateRepositoryOnedriveAccess(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(repositoryOnedriveAccess, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = repositoryOnedriveAccessIdSchema.parse({ id });
    const { repositoryOnedriveAccess } = await deleteRepositoryOnedriveAccess(
      validatedParams.id,
    );

    return NextResponse.json(repositoryOnedriveAccess, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
