import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createEnrolLtiDeployment,
  deleteEnrolLtiDeployment,
  updateEnrolLtiDeployment,
} from "@soco/enrol-api/enrolLtiDeployments/mutations";
import { 
  enrolLtiDeploymentIdSchema,
  insertEnrolLtiDeploymentParams,
  updateEnrolLtiDeploymentParams 
} from "@soco/enrol-db/schema/enrolLtiDeployments";

export async function POST(req: Request) {
  try {
    const validatedData = insertEnrolLtiDeploymentParams.parse(await req.json());
    const { enrolLtiDeployment } = await createEnrolLtiDeployment(validatedData);

    revalidatePath("/enrolLtiDeployments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(enrolLtiDeployment, { status: 201 });
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

    const validatedData = updateEnrolLtiDeploymentParams.parse(await req.json());
    const validatedParams = enrolLtiDeploymentIdSchema.parse({ id });

    const { enrolLtiDeployment } = await updateEnrolLtiDeployment(validatedParams.id, validatedData);

    return NextResponse.json(enrolLtiDeployment, { status: 200 });
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

    const validatedParams = enrolLtiDeploymentIdSchema.parse({ id });
    const { enrolLtiDeployment } = await deleteEnrolLtiDeployment(validatedParams.id);

    return NextResponse.json(enrolLtiDeployment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
