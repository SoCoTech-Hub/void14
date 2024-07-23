"use client";

import { useState } from "react";

import { GradingInstance } from "@soco/grade-db/schema/gradingInstances";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import GradingInstanceForm from "./GradingInstanceForm";

export default function GradingInstanceModal({
  gradingInstance,
  emptyState,
}: {
  gradingInstance?: GradingInstance;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!gradingInstance?.id;
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
            New Grading Instance
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
            {editing ? "Edit" : "Create"} Grading Instance
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <GradingInstanceForm
            closeModal={closeModal}
            gradingInstance={gradingInstance}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
