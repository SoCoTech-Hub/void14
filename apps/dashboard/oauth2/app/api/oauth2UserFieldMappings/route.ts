import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createOauth2UserFieldMapping,
  deleteOauth2UserFieldMapping,
  updateOauth2UserFieldMapping,
} from "@soco/oauth2-api/oauth2UserFieldMappings/mutations";
import { 
  oauth2UserFieldMappingIdSchema,
  insertOauth2UserFieldMappingParams,
  updateOauth2UserFieldMappingParams 
} from "@soco/oauth2-db/schema/oauth2UserFieldMappings";

export async function POST(req: Request) {
  try {
    const validatedData = insertOauth2UserFieldMappingParams.parse(await req.json());
    const { oauth2UserFieldMapping } = await createOauth2UserFieldMapping(validatedData);

    revalidatePath("/oauth2UserFieldMappings"); // optional - assumes you will have named route same as entity

    return NextResponse.json(oauth2UserFieldMapping, { status: 201 });
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

    const validatedData = updateOauth2UserFieldMappingParams.parse(await req.json());
    const validatedParams = oauth2UserFieldMappingIdSchema.parse({ id });

    const { oauth2UserFieldMapping } = await updateOauth2UserFieldMapping(validatedParams.id, validatedData);

    return NextResponse.json(oauth2UserFieldMapping, { status: 200 });
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

    const validatedParams = oauth2UserFieldMappingIdSchema.parse({ id });
    const { oauth2UserFieldMapping } = await deleteOauth2UserFieldMapping(validatedParams.id);

    return NextResponse.json(oauth2UserFieldMapping, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
