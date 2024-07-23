"use client";

import { useState } from "react";

import { H5pLibraryDependency } from "@soco/h5p-db/schema/h5pLibraryDependencies";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import H5pLibraryDependencyForm from "./H5pLibraryDependencyForm";

export default function H5pLibraryDependencyModal({
  h5pLibraryDependency,
  emptyState,
}: {
  h5pLibraryDependency?: H5pLibraryDependency;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!h5pLibraryDependency?.id;
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
            New H5p Library Dependency
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
            {editing ? "Edit" : "Create"} H5p Library Dependency
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <H5pLibraryDependencyForm
            closeModal={closeModal}
            h5pLibraryDependency={h5pLibraryDependency}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
