import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createJobApplication,
  deleteJobApplication,
  updateJobApplication,
} from "../../../lib/api/jobApplications/mutations";
import {
  insertJobApplicationParams,
  jobApplicationIdSchema,
  updateJobApplicationParams,
} from "../../../lib/db/schema/jobApplications";

export async function POST(req: Request) {
  try {
    const validatedData = insertJobApplicationParams.parse(await req.json());
    const { jobApplication } = await createJobApplication(validatedData);

    revalidatePath("/jobApplications"); // optional - assumes you will have named route same as entity

    return NextResponse.json(jobApplication, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateJobApplicationParams.parse(await req.json());
    const validatedParams = jobApplicationIdSchema.parse({ id });

    const { jobApplication } = await updateJobApplication(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(jobApplication, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = jobApplicationIdSchema.parse({ id });
    const { jobApplication } = await deleteJobApplication(validatedParams.id);

    return NextResponse.json(jobApplication, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
