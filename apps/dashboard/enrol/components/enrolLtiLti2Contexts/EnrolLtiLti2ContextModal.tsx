"use client";

import { useState } from "react";

import { EnrolLtiLti2Context } from "@soco/enrol-db/schema/enrolLtiLti2Contexts";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import EnrolLtiLti2ContextForm from "./EnrolLtiLti2ContextForm";

export default function EnrolLtiLti2ContextModal({
  enrolLtiLti2Context,
  emptyState,
}: {
  enrolLtiLti2Context?: EnrolLtiLti2Context;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!enrolLtiLti2Context?.id;
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
            New Enrol Lti Lti2 Context
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
            {editing ? "Edit" : "Create"} Enrol Lti Lti2 Context
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <EnrolLtiLti2ContextForm
            closeModal={closeModal}
            enrolLtiLti2Context={enrolLtiLti2Context}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
