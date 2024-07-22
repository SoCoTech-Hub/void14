"use client";

import { useState } from "react";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import MnetServiceEnrolCourseForm from "./MnetServiceEnrolCourseForm";
import { MnetServiceEnrolCourse } from "@soco/mnet-db/schema/mnetServiceEnrolCourses";

export default function MnetServiceEnrolCourseModal({ 
  mnetServiceEnrolCourse,
  emptyState,
}: { 
  mnetServiceEnrolCourse?: MnetServiceEnrolCourse;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!mnetServiceEnrolCourse?.id;
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
            New Mnet Service Enrol Course
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Mnet Service Enrol Course</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <MnetServiceEnrolCourseForm closeModal={closeModal} mnetServiceEnrolCourse={mnetServiceEnrolCourse} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
