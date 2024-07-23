"use client";

import { useState } from "react";

import { H5pactivityAttempt } from "@soco/h5p-db/schema/h5pactivityAttempts";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import H5pactivityAttemptForm from "./H5pactivityAttemptForm";

export default function H5pactivityAttemptModal({
  h5pactivityAttempt,
  emptyState,
}: {
  h5pactivityAttempt?: H5pactivityAttempt;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!h5pactivityAttempt?.id;
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
            New H5pactivity Attempt
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
            {editing ? "Edit" : "Create"} H5pactivity Attempt
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <H5pactivityAttemptForm
            closeModal={closeModal}
            h5pactivityAttempt={h5pactivityAttempt}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
