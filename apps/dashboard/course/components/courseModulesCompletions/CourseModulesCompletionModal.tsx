"use client";

import { useState } from "react";

import { CourseModulesCompletion } from "@soco/course-db/schema/courseModulesCompletions";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import CourseModulesCompletionForm from "./CourseModulesCompletionForm";

export default function CourseModulesCompletionModal({
  courseModulesCompletion,
  emptyState,
}: {
  courseModulesCompletion?: CourseModulesCompletion;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!courseModulesCompletion?.id;
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
            New Course Modules Completion
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
            {editing ? "Edit" : "Create"} Course Modules Completion
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <CourseModulesCompletionForm
            closeModal={closeModal}
            courseModulesCompletion={courseModulesCompletion}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
