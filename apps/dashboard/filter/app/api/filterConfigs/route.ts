import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFilterConfig,
  deleteFilterConfig,
  updateFilterConfig,
} from "@soco/filter-api/filterConfigs/mutations";
import { 
  filterConfigIdSchema,
  insertFilterConfigParams,
  updateFilterConfigParams 
} from "@soco/filter-db/schema/filterConfigs";

export async function POST(req: Request) {
  try {
    const validatedData = insertFilterConfigParams.parse(await req.json());
    const { filterConfig } = await createFilterConfig(validatedData);

    revalidatePath("/filterConfigs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(filterConfig, { status: 201 });
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

    const validatedData = updateFilterConfigParams.parse(await req.json());
    const validatedParams = filterConfigIdSchema.parse({ id });

    const { filterConfig } = await updateFilterConfig(validatedParams.id, validatedData);

    return NextResponse.json(filterConfig, { status: 200 });
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

    const validatedParams = filterConfigIdSchema.parse({ id });
    const { filterConfig } = await deleteFilterConfig(validatedParams.id);

    return NextResponse.json(filterConfig, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
