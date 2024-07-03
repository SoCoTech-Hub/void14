import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type CustomFieldFieldId, customFieldFieldIdSchema, customFieldFields } from "@/lib/db/schema/customFieldFields";
import { customFieldCategories } from "@/lib/db/schema/customFieldCategories";

export const getCustomFieldFields = async () => {
  const rows = await db.select({ customFieldField: customFieldFields, customFieldCategory: customFieldCategories }).from(customFieldFields).leftJoin(customFieldCategories, eq(customFieldFields.customFieldCategoryId, customFieldCategories.id));
  const c = rows .map((r) => ({ ...r.customFieldField, customFieldCategory: r.customFieldCategory})); 
  return { customFieldFields: c };
};

export const getCustomFieldFieldById = async (id: CustomFieldFieldId) => {
  const { id: customFieldFieldId } = customFieldFieldIdSchema.parse({ id });
  const [row] = await db.select({ customFieldField: customFieldFields, customFieldCategory: customFieldCategories }).from(customFieldFields).where(eq(customFieldFields.id, customFieldFieldId)).leftJoin(customFieldCategories, eq(customFieldFields.customFieldCategoryId, customFieldCategories.id));
  if (row === undefined) return {};
  const c =  { ...row.customFieldField, customFieldCategory: row.customFieldCategory } ;
  return { customFieldField: c };
};


