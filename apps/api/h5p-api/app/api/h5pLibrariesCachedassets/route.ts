import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createH5pLibrariesCachedasset,
  deleteH5pLibrariesCachedasset,
  updateH5pLibrariesCachedasset,
} from "../../../lib/api/h5pLibrariesCachedassets/mutations";
import {
  h5pLibrariesCachedassetIdSchema,
  insertH5pLibrariesCachedassetParams,
  updateH5pLibrariesCachedassetParams,
} from "../../../lib/db/schema/h5pLibrariesCachedassets";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pLibrariesCachedassetParams.parse(
      await req.json(),
    );
    const { h5pLibrariesCachedasset } =
      await createH5pLibrariesCachedasset(validatedData);

    revalidatePath("/h5pLibrariesCachedassets"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5pLibrariesCachedasset, { status: 201 });
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

    const validatedData = updateH5pLibrariesCachedassetParams.parse(
      await req.json(),
    );
    const validatedParams = h5pLibrariesCachedassetIdSchema.parse({ id });

    const { h5pLibrariesCachedasset } = await updateH5pLibrariesCachedasset(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(h5pLibrariesCachedasset, { status: 200 });
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

    const validatedParams = h5pLibrariesCachedassetIdSchema.parse({ id });
    const { h5pLibrariesCachedasset } = await deleteH5pLibrariesCachedasset(
      validatedParams.id,
    );

    return NextResponse.json(h5pLibrariesCachedasset, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
