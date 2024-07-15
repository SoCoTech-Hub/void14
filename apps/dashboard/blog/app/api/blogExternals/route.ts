import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBlogExternal,
  deleteBlogExternal,
  updateBlogExternal,
} from "@soco/blog-api/blogExternals/mutations";
import { 
  blogExternalIdSchema,
  insertBlogExternalParams,
  updateBlogExternalParams 
} from "@soco/blog-db/schema/blogExternals";

export async function POST(req: Request) {
  try {
    const validatedData = insertBlogExternalParams.parse(await req.json());
    const { blogExternal } = await createBlogExternal(validatedData);

    revalidatePath("/blogExternals"); // optional - assumes you will have named route same as entity

    return NextResponse.json(blogExternal, { status: 201 });
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

    const validatedData = updateBlogExternalParams.parse(await req.json());
    const validatedParams = blogExternalIdSchema.parse({ id });

    const { blogExternal } = await updateBlogExternal(validatedParams.id, validatedData);

    return NextResponse.json(blogExternal, { status: 200 });
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

    const validatedParams = blogExternalIdSchema.parse({ id });
    const { blogExternal } = await deleteBlogExternal(validatedParams.id);

    return NextResponse.json(blogExternal, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
