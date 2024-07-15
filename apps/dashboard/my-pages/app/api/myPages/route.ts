import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMyPage,
  deleteMyPage,
  updateMyPage,
} from "@soco/my-pages-api/myPages/mutations";
import { 
  myPageIdSchema,
  insertMyPageParams,
  updateMyPageParams 
} from "@soco/my-pages-db/schema/myPages";

export async function POST(req: Request) {
  try {
    const validatedData = insertMyPageParams.parse(await req.json());
    const { myPage } = await createMyPage(validatedData);

    revalidatePath("/myPages"); // optional - assumes you will have named route same as entity

    return NextResponse.json(myPage, { status: 201 });
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

    const validatedData = updateMyPageParams.parse(await req.json());
    const validatedParams = myPageIdSchema.parse({ id });

    const { myPage } = await updateMyPage(validatedParams.id, validatedData);

    return NextResponse.json(myPage, { status: 200 });
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

    const validatedParams = myPageIdSchema.parse({ id });
    const { myPage } = await deleteMyPage(validatedParams.id);

    return NextResponse.json(myPage, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
