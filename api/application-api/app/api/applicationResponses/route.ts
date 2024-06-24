import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createApplicationResponse,
  deleteApplicationResponse,
  updateApplicationResponse,
} from "@/lib/api/applicationResponses/mutations";
import { 
  applicationResponseIdSchema,
  insertApplicationResponseParams,
  updateApplicationResponseParams 
} from "@/lib/db/schema/applicationResponses";

export async function POST(req: Request) {
  try {
    const validatedData = insertApplicationResponseParams.parse(await req.json());
    const { applicationResponse } = await createApplicationResponse(validatedData);

    revalidatePath("/applicationResponses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(applicationResponse, { status: 201 });
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

    const validatedData = updateApplicationResponseParams.parse(await req.json());
    const validatedParams = applicationResponseIdSchema.parse({ id });

    const { applicationResponse } = await updateApplicationResponse(validatedParams.id, validatedData);

    return NextResponse.json(applicationResponse, { status: 200 });
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

    const validatedParams = applicationResponseIdSchema.parse({ id });
    const { applicationResponse } = await deleteApplicationResponse(validatedParams.id);

    return NextResponse.json(applicationResponse, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
