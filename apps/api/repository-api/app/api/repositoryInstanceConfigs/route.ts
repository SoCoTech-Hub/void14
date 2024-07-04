import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createRepositoryInstanceConfig,
  deleteRepositoryInstanceConfig,
  updateRepositoryInstanceConfig,
} from "../../../lib/api/repositoryInstanceConfigs/mutations";
import {
  insertRepositoryInstanceConfigParams,
  repositoryInstanceConfigIdSchema,
  updateRepositoryInstanceConfigParams,
} from "../../../lib/db/schema/repositoryInstanceConfigs";

export async function POST(req: Request) {
  try {
    const validatedData = insertRepositoryInstanceConfigParams.parse(
      await req.json(),
    );
    const { repositoryInstanceConfig } =
      await createRepositoryInstanceConfig(validatedData);

    revalidatePath("/repositoryInstanceConfigs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(repositoryInstanceConfig, { status: 201 });
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

    const validatedData = updateRepositoryInstanceConfigParams.parse(
      await req.json(),
    );
    const validatedParams = repositoryInstanceConfigIdSchema.parse({ id });

    const { repositoryInstanceConfig } = await updateRepositoryInstanceConfig(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(repositoryInstanceConfig, { status: 200 });
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

    const validatedParams = repositoryInstanceConfigIdSchema.parse({ id });
    const { repositoryInstanceConfig } = await deleteRepositoryInstanceConfig(
      validatedParams.id,
    );

    return NextResponse.json(repositoryInstanceConfig, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
