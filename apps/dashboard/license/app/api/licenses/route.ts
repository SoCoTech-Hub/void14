import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLicense,
  deleteLicense,
  updateLicense,
} from "@/lib/api/licenses/mutations";
import { 
  licenseIdSchema,
  insertLicenseParams,
  updateLicenseParams 
} from "@/lib/db/schema/licenses";

export async function POST(req: Request) {
  try {
    const validatedData = insertLicenseParams.parse(await req.json());
    const { license } = await createLicense(validatedData);

    revalidatePath("/licenses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(license, { status: 201 });
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

    const validatedData = updateLicenseParams.parse(await req.json());
    const validatedParams = licenseIdSchema.parse({ id });

    const { license } = await updateLicense(validatedParams.id, validatedData);

    return NextResponse.json(license, { status: 200 });
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

    const validatedParams = licenseIdSchema.parse({ id });
    const { license } = await deleteLicense(validatedParams.id);

    return NextResponse.json(license, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
