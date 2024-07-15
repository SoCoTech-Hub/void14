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
import H5pactivityAttemptsResultForm from "./H5pactivityAttemptsResultForm";
import { H5pactivityAttemptsResult } from "@soco/h5p-db/schema/h5pactivityAttemptsResults";

export default function H5pactivityAttemptsResultModal({ 
  h5pactivityAttemptsResult,
  emptyState,
}: { 
  h5pactivityAttemptsResult?: H5pactivityAttemptsResult;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!h5pactivityAttemptsResult?.id;
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
            New H5pactivity Attempts Result
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
          <DialogTitle>{ editing ? "Edit" : "Create" } H5pactivity Attempts Result</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <H5pactivityAttemptsResultForm closeModal={closeModal} h5pactivityAttemptsResult={h5pactivityAttemptsResult} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
