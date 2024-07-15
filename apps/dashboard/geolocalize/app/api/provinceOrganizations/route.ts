import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createProvinceOrganization,
  deleteProvinceOrganization,
  updateProvinceOrganization,
} from "@soco/geolocalize-api/provinceOrganizations/mutations";
import { 
  provinceOrganizationIdSchema,
  insertProvinceOrganizationParams,
  updateProvinceOrganizationParams 
} from "@soco/geolocalize-db/schema/provinceOrganizations";

export async function POST(req: Request) {
  try {
    const validatedData = insertProvinceOrganizationParams.parse(await req.json());
    const { provinceOrganization } = await createProvinceOrganization(validatedData);

    revalidatePath("/provinceOrganizations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(provinceOrganization, { status: 201 });
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

    const validatedData = updateProvinceOrganizationParams.parse(await req.json());
    const validatedParams = provinceOrganizationIdSchema.parse({ id });

    const { provinceOrganization } = await updateProvinceOrganization(validatedParams.id, validatedData);

    return NextResponse.json(provinceOrganization, { status: 200 });
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

    const validatedParams = provinceOrganizationIdSchema.parse({ id });
    const { provinceOrganization } = await deleteProvinceOrganization(validatedParams.id);

    return NextResponse.json(provinceOrganization, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
