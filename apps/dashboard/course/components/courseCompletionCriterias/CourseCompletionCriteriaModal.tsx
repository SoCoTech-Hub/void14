"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CourseCompletionCriteriaForm from "./CourseCompletionCriteriaForm";
import { CourseCompletionCriteria } from "@/lib/db/schema/courseCompletionCriterias";

export default function CourseCompletionCriteriaModal({ 
  courseCompletionCriteria,
  emptyState,
}: { 
  courseCompletionCriteria?: CourseCompletionCriteria;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!courseCompletionCriteria?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
      { emptyState ? (
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
            New Course Completion Criteria
          </Button>
        ) : (
        <Button
          variant={editing ? "ghost" : "outline"}
          size={editing ? "sm" : "icon"}
        >
          {editing ? "Edit" : "+"}
        </Button> )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{ editing ? "Edit" : "Create" } Course Completion Criteria</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <CourseCompletionCriteriaForm closeModal={closeModal} courseCompletionCriteria={courseCompletionCriteria} />
        </div>
      </DialogContent>
    </Dialog>
  );
}