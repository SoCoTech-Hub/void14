import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createProvince,
  deleteProvince,
  updateProvince,
} from "@/lib/api/provinces/mutations";
import { 
  provinceIdSchema,
  insertProvinceParams,
  updateProvinceParams 
} from "@/lib/db/schema/provinces";

export async function POST(req: Request) {
  try {
    const validatedData = insertProvinceParams.parse(await req.json());
    const { province } = await createProvince(validatedData);

    revalidatePath("/provinces"); // optional - assumes you will have named route same as entity

    return NextResponse.json(province, { status: 201 });
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

    const validatedData = updateProvinceParams.parse(await req.json());
    const validatedParams = provinceIdSchema.parse({ id });

    const { province } = await updateProvince(validatedParams.id, validatedData);

    return NextResponse.json(province, { status: 200 });
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

    const validatedParams = provinceIdSchema.parse({ id });
    const { province } = await deleteProvince(validatedParams.id);

    return NextResponse.json(province, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
