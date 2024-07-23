"use client";

import { useState } from "react";

import { CustomFieldCategory } from "@soco/custom-field-db/schema/customFieldCategories";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import CustomFieldCategoryForm from "./CustomFieldCategoryForm";

export default function CustomFieldCategoryModal({
  customFieldCategory,
  emptyState,
}: {
  customFieldCategory?: CustomFieldCategory;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!customFieldCategory?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Custom Field Category
          </Button>
        ) : (
          <Button
            variant={editing ? "ghost" : "outline"}
            size={editing ? "sm" : "icon"}
          >
            {editing ? "Edit" : "+"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>
            {editing ? "Edit" : "Create"} Custom Field Category
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <CustomFieldCategoryForm
            closeModal={closeModal}
            customFieldCategory={customFieldCategory}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
