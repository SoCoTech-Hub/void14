import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSupportDepartment,
  deleteSupportDepartment,
  updateSupportDepartment,
} from "@/lib/api/supportDepartments/mutations";
import { 
  supportDepartmentIdSchema,
  insertSupportDepartmentParams,
  updateSupportDepartmentParams 
} from "@/lib/db/schema/supportDepartments";

export async function POST(req: Request) {
  try {
    const validatedData = insertSupportDepartmentParams.parse(await req.json());
    const { supportDepartment } = await createSupportDepartment(validatedData);

    revalidatePath("/supportDepartments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(supportDepartment, { status: 201 });
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

    const validatedData = updateSupportDepartmentParams.parse(await req.json());
    const validatedParams = supportDepartmentIdSchema.parse({ id });

    const { supportDepartment } = await updateSupportDepartment(validatedParams.id, validatedData);

    return NextResponse.json(supportDepartment, { status: 200 });
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

    const validatedParams = supportDepartmentIdSchema.parse({ id });
    const { supportDepartment } = await deleteSupportDepartment(validatedParams.id);

    return NextResponse.json(supportDepartment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
