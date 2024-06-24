import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMnetSsoAccessControl,
  deleteMnetSsoAccessControl,
  updateMnetSsoAccessControl,
} from "@/lib/api/mnetSsoAccessControls/mutations";
import { 
  mnetSsoAccessControlIdSchema,
  insertMnetSsoAccessControlParams,
  updateMnetSsoAccessControlParams 
} from "@/lib/db/schema/mnetSsoAccessControls";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetSsoAccessControlParams.parse(await req.json());
    const { mnetSsoAccessControl } = await createMnetSsoAccessControl(validatedData);

    revalidatePath("/mnetSsoAccessControls"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetSsoAccessControl, { status: 201 });
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

    const validatedData = updateMnetSsoAccessControlParams.parse(await req.json());
    const validatedParams = mnetSsoAccessControlIdSchema.parse({ id });

    const { mnetSsoAccessControl } = await updateMnetSsoAccessControl(validatedParams.id, validatedData);

    return NextResponse.json(mnetSsoAccessControl, { status: 200 });
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

    const validatedParams = mnetSsoAccessControlIdSchema.parse({ id });
    const { mnetSsoAccessControl } = await deleteMnetSsoAccessControl(validatedParams.id);

    return NextResponse.json(mnetSsoAccessControl, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
