"use client";

import { useState } from "react";

import { BursaryCategory } from "@soco/bursaries-db/schema/bursaryCategories";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import BursaryCategoryForm from "./BursaryCategoryForm";

export default function BursaryCategoryModal({
  bursaryCategory,
  emptyState,
}: {
  bursaryCategory?: BursaryCategory;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!bursaryCategory?.id;
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
            New Bursary Category
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
            {editing ? "Edit" : "Create"} Bursary Category
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <BursaryCategoryForm
            closeModal={closeModal}
            bursaryCategory={bursaryCategory}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
