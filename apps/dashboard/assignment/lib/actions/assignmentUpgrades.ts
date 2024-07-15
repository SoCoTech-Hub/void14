"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignmentUpgrade,
  deleteAssignmentUpgrade,
  updateAssignmentUpgrade,
} from "@/lib/api/assignmentUpgrades/mutations";
import {
  AssignmentUpgradeId,
  NewAssignmentUpgradeParams,
  UpdateAssignmentUpgradeParams,
  assignmentUpgradeIdSchema,
  insertAssignmentUpgradeParams,
  updateAssignmentUpgradeParams,
} from "@/lib/db/schema/assignmentUpgrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignmentUpgrades = () => revalidatePath("/assignment-upgrades");

export const createAssignmentUpgradeAction = async (input: NewAssignmentUpgradeParams) => {
  try {
    const payload = insertAssignmentUpgradeParams.parse(input);
    await createAssignmentUpgrade(payload);
    revalidateAssignmentUpgrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignmentUpgradeAction = async (input: UpdateAssignmentUpgradeParams) => {
  try {
    const payload = updateAssignmentUpgradeParams.parse(input);
    await updateAssignmentUpgrade(payload.id, payload);
    revalidateAssignmentUpgrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignmentUpgradeAction = async (input: AssignmentUpgradeId) => {
  try {
    const payload = assignmentUpgradeIdSchema.parse({ id: input });
    await deleteAssignmentUpgrade(payload.id);
    revalidateAssignmentUpgrades();
  } catch (e) {
    return handleErrors(e);
  }
};
