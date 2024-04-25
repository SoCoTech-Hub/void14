import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAffiliate,
  deleteAffiliate,
  updateAffiliate,
} from "@/lib/api/affiliates/mutations";
import { 
  affiliateIdSchema,
  insertAffiliateParams,
  updateAffiliateParams 
} from "@/lib/db/schema/affiliates";

export async function POST(req: Request) {
  try {
    const validatedData = insertAffiliateParams.parse(await req.json());
    const { affiliate } = await createAffiliate(validatedData);

    revalidatePath("/affiliates"); // optional - assumes you will have named route same as entity

    return NextResponse.json(affiliate, { status: 201 });
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

    const validatedData = updateAffiliateParams.parse(await req.json());
    const validatedParams = affiliateIdSchema.parse({ id });

    const { affiliate } = await updateAffiliate(validatedParams.id, validatedData);

    return NextResponse.json(affiliate, { status: 200 });
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

    const validatedParams = affiliateIdSchema.parse({ id });
    const { affiliate } = await deleteAffiliate(validatedParams.id);

    return NextResponse.json(affiliate, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
