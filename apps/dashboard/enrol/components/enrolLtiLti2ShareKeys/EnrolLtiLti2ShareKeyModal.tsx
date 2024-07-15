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
import EnrolLtiLti2ShareKeyForm from "./EnrolLtiLti2ShareKeyForm";
import { EnrolLtiLti2ShareKey } from "@soco/enrol-db/schema/enrolLtiLti2ShareKeys";

export default function EnrolLtiLti2ShareKeyModal({ 
  enrolLtiLti2ShareKey,
  emptyState,
}: { 
  enrolLtiLti2ShareKey?: EnrolLtiLti2ShareKey;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!enrolLtiLti2ShareKey?.id;
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
            New Enrol Lti Lti2 Share Key
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Enrol Lti Lti2 Share Key</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <EnrolLtiLti2ShareKeyForm closeModal={closeModal} enrolLtiLti2ShareKey={enrolLtiLti2ShareKey} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
