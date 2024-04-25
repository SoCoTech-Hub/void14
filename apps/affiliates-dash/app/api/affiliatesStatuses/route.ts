import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAffiliatesStatus,
  deleteAffiliatesStatus,
  updateAffiliatesStatus,
} from "@/lib/api/affiliatesStatuses/mutations";
import { 
  affiliatesStatusIdSchema,
  insertAffiliatesStatusParams,
  updateAffiliatesStatusParams 
} from "@/lib/db/schema/affiliatesStatuses";

export async function POST(req: Request) {
  try {
    const validatedData = insertAffiliatesStatusParams.parse(await req.json());
    const { affiliatesStatus } = await createAffiliatesStatus(validatedData);

    revalidatePath("/affiliatesStatuses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(affiliatesStatus, { status: 201 });
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

    const validatedData = updateAffiliatesStatusParams.parse(await req.json());
    const validatedParams = affiliatesStatusIdSchema.parse({ id });

    const { affiliatesStatus } = await updateAffiliatesStatus(validatedParams.id, validatedData);

    return NextResponse.json(affiliatesStatus, { status: 200 });
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

    const validatedParams = affiliatesStatusIdSchema.parse({ id });
    const { affiliatesStatus } = await deleteAffiliatesStatus(validatedParams.id);

    return NextResponse.json(affiliatesStatus, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
