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
import EnrolLtiLti2ConsumerForm from "./EnrolLtiLti2ConsumerForm";
import { EnrolLtiLti2Consumer } from "@soco/enrol-db/schema/enrolLtiLti2Consumers";

export default function EnrolLtiLti2ConsumerModal({ 
  enrolLtiLti2Consumer,
  emptyState,
}: { 
  enrolLtiLti2Consumer?: EnrolLtiLti2Consumer;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!enrolLtiLti2Consumer?.id;
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
            New Enrol Lti Lti2 Consumer
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Enrol Lti Lti2 Consumer</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <EnrolLtiLti2ConsumerForm closeModal={closeModal} enrolLtiLti2Consumer={enrolLtiLti2Consumer} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
