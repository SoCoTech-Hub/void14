import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWorkshopFormComment,
  deleteWorkshopFormComment,
  updateWorkshopFormComment,
} from "@/lib/api/workshopFormComments/mutations";
import { 
  workshopFormCommentIdSchema,
  insertWorkshopFormCommentParams,
  updateWorkshopFormCommentParams 
} from "@/lib/db/schema/workshopFormComments";

export async function POST(req: Request) {
  try {
    const validatedData = insertWorkshopFormCommentParams.parse(await req.json());
    const { workshopFormComment } = await createWorkshopFormComment(validatedData);

    revalidatePath("/workshopFormComments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(workshopFormComment, { status: 201 });
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

    const validatedData = updateWorkshopFormCommentParams.parse(await req.json());
    const validatedParams = workshopFormCommentIdSchema.parse({ id });

    const { workshopFormComment } = await updateWorkshopFormComment(validatedParams.id, validatedData);

    return NextResponse.json(workshopFormComment, { status: 200 });
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

    const validatedParams = workshopFormCommentIdSchema.parse({ id });
    const { workshopFormComment } = await deleteWorkshopFormComment(validatedParams.id);

    return NextResponse.json(workshopFormComment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
