"use client";

import { useState } from "react";

import { GradeOutcomesHistory } from "@soco/grade-db/schema/gradeOutcomesHistories";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import GradeOutcomesHistoryForm from "./GradeOutcomesHistoryForm";

export default function GradeOutcomesHistoryModal({
  gradeOutcomesHistory,
  emptyState,
}: {
  gradeOutcomesHistory?: GradeOutcomesHistory;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!gradeOutcomesHistory?.id;
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
            New Grade Outcomes History
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
            {editing ? "Edit" : "Create"} Grade Outcomes History
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <GradeOutcomesHistoryForm
            closeModal={closeModal}
            gradeOutcomesHistory={gradeOutcomesHistory}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
