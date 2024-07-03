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
import EnrolLtiLti2UserResultForm from "./EnrolLtiLti2UserResultForm";
import { EnrolLtiLti2UserResult } from "@/lib/db/schema/enrolLtiLti2UserResults";

export default function EnrolLtiLti2UserResultModal({ 
  enrolLtiLti2UserResult,
  emptyState,
}: { 
  enrolLtiLti2UserResult?: EnrolLtiLti2UserResult;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!enrolLtiLti2UserResult?.id;
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
            New Enrol Lti Lti2 User Result
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Enrol Lti Lti2 User Result</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <EnrolLtiLti2UserResultForm closeModal={closeModal} enrolLtiLti2UserResult={enrolLtiLti2UserResult} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
