import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "@/lib/api/addresses/mutations";
import { 
  addressIdSchema,
  insertAddressParams,
  updateAddressParams 
} from "@/lib/db/schema/addresses";

export async function POST(req: Request) {
  try {
    const validatedData = insertAddressParams.parse(await req.json());
    const { address } = await createAddress(validatedData);

    revalidatePath("/addresses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(address, { status: 201 });
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

    const validatedData = updateAddressParams.parse(await req.json());
    const validatedParams = addressIdSchema.parse({ id });

    const { address } = await updateAddress(validatedParams.id, validatedData);

    return NextResponse.json(address, { status: 200 });
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

    const validatedParams = addressIdSchema.parse({ id });
    const { address } = await deleteAddress(validatedParams.id);

    return NextResponse.json(address, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
