import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "@/lib/api/organizations/mutations";
import { 
  organizationIdSchema,
  insertOrganizationParams,
  updateOrganizationParams 
} from "@/lib/db/schema/organizations";

export async function POST(req: Request) {
  try {
    const validatedData = insertOrganizationParams.parse(await req.json());
    const { organization } = await createOrganization(validatedData);

    revalidatePath("/organizations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(organization, { status: 201 });
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

    const validatedData = updateOrganizationParams.parse(await req.json());
    const validatedParams = organizationIdSchema.parse({ id });

    const { organization } = await updateOrganization(validatedParams.id, validatedData);

    return NextResponse.json(organization, { status: 200 });
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

    const validatedParams = organizationIdSchema.parse({ id });
    const { organization } = await deleteOrganization(validatedParams.id);

    return NextResponse.json(organization, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
