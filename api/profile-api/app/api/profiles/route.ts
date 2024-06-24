import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createProfile,
  deleteProfile,
  updateProfile,
} from "@/lib/api/profiles/mutations";
import { 
  profileIdSchema,
  insertProfileParams,
  updateProfileParams 
} from "@/lib/db/schema/profiles";

export async function POST(req: Request) {
  try {
    const validatedData = insertProfileParams.parse(await req.json());
    const { profile } = await createProfile(validatedData);

    revalidatePath("/profiles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(profile, { status: 201 });
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

    const validatedData = updateProfileParams.parse(await req.json());
    const validatedParams = profileIdSchema.parse({ id });

    const { profile } = await updateProfile(validatedParams.id, validatedData);

    return NextResponse.json(profile, { status: 200 });
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

    const validatedParams = profileIdSchema.parse({ id });
    const { profile } = await deleteProfile(validatedParams.id);

    return NextResponse.json(profile, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
