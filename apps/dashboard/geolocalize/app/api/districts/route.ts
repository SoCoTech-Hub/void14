import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createDistrict,
  deleteDistrict,
  updateDistrict,
} from "@soco/geolocalize-api/districts/mutations";
import { 
  districtIdSchema,
  insertDistrictParams,
  updateDistrictParams 
} from "@soco/geolocalize-db/schema/districts";

export async function POST(req: Request) {
  try {
    const validatedData = insertDistrictParams.parse(await req.json());
    const { district } = await createDistrict(validatedData);

    revalidatePath("/districts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(district, { status: 201 });
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

    const validatedData = updateDistrictParams.parse(await req.json());
    const validatedParams = districtIdSchema.parse({ id });

    const { district } = await updateDistrict(validatedParams.id, validatedData);

    return NextResponse.json(district, { status: 200 });
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

    const validatedParams = districtIdSchema.parse({ id });
    const { district } = await deleteDistrict(validatedParams.id);

    return NextResponse.json(district, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
