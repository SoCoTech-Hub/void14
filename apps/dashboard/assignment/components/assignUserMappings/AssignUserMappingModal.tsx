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
import AssignUserMappingForm from "./AssignUserMappingForm";
import { AssignUserMapping } from "@soco/assignment-db/schema/assignUserMappings";

export default function AssignUserMappingModal({ 
  assignUserMapping,
  emptyState,
}: { 
  assignUserMapping?: AssignUserMapping;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!assignUserMapping?.id;
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
            New Assign User Mapping
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Assign User Mapping</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <AssignUserMappingForm closeModal={closeModal} assignUserMapping={assignUserMapping} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
