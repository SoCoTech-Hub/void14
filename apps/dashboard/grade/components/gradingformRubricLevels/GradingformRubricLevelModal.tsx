"use client";

import { useState } from "react";

import { GradingformRubricLevel } from "@soco/grade-db/schema/gradingformRubricLevels";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import GradingformRubricLevelForm from "./GradingformRubricLevelForm";

export default function GradingformRubricLevelModal({
  gradingformRubricLevel,
  emptyState,
}: {
  gradingformRubricLevel?: GradingformRubricLevel;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!gradingformRubricLevel?.id;
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
            New Gradingform Rubric Level
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
            {editing ? "Edit" : "Create"} Gradingform Rubric Level
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <GradingformRubricLevelForm
            closeModal={closeModal}
            gradingformRubricLevel={gradingformRubricLevel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
