import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createJobApplicationsApplicationCategory,
  deleteJobApplicationsApplicationCategory,
  updateJobApplicationsApplicationCategory,
} from "@/lib/api/jobApplicationsApplicationCategories/mutations";
import { 
  jobApplicationsApplicationCategoryIdSchema,
  insertJobApplicationsApplicationCategoryParams,
  updateJobApplicationsApplicationCategoryParams 
} from "@/lib/db/schema/jobApplicationsApplicationCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertJobApplicationsApplicationCategoryParams.parse(await req.json());
    const { jobApplicationsApplicationCategory } = await createJobApplicationsApplicationCategory(validatedData);

    revalidatePath("/jobApplicationsApplicationCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(jobApplicationsApplicationCategory, { status: 201 });
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

    const validatedData = updateJobApplicationsApplicationCategoryParams.parse(await req.json());
    const validatedParams = jobApplicationsApplicationCategoryIdSchema.parse({ id });

    const { jobApplicationsApplicationCategory } = await updateJobApplicationsApplicationCategory(validatedParams.id, validatedData);

    return NextResponse.json(jobApplicationsApplicationCategory, { status: 200 });
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

    const validatedParams = jobApplicationsApplicationCategoryIdSchema.parse({ id });
    const { jobApplicationsApplicationCategory } = await deleteJobApplicationsApplicationCategory(validatedParams.id);

    return NextResponse.json(jobApplicationsApplicationCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
