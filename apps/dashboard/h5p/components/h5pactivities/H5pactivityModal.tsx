"use client";

import { useState } from "react";

import { H5pactivity } from "@soco/h5p-db/schema/h5pactivities";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import H5pactivityForm from "./H5pactivityForm";

export default function H5pactivityModal({
  h5pactivity,
  emptyState,
}: {
  h5pactivity?: H5pactivity;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!h5pactivity?.id;
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
            New H5pactivity
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
          <DialogTitle>{editing ? "Edit" : "Create"} H5pactivity</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <H5pactivityForm closeModal={closeModal} h5pactivity={h5pactivity} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
