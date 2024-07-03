import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFaq,
  deleteFaq,
  updateFaq,
} from "@/lib/api/faqs/mutations";
import { 
  faqIdSchema,
  insertFaqParams,
  updateFaqParams 
} from "@/lib/db/schema/faqs";

export async function POST(req: Request) {
  try {
    const validatedData = insertFaqParams.parse(await req.json());
    const { faq } = await createFaq(validatedData);

    revalidatePath("/faqs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(faq, { status: 201 });
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

    const validatedData = updateFaqParams.parse(await req.json());
    const validatedParams = faqIdSchema.parse({ id });

    const { faq } = await updateFaq(validatedParams.id, validatedData);

    return NextResponse.json(faq, { status: 200 });
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

    const validatedParams = faqIdSchema.parse({ id });
    const { faq } = await deleteFaq(validatedParams.id);

    return NextResponse.json(faq, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
