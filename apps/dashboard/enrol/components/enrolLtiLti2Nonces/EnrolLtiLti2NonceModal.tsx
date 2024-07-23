"use client";

import { useState } from "react";

import { EnrolLtiLti2Nonce } from "@soco/enrol-db/schema/enrolLtiLti2Nonces";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import EnrolLtiLti2NonceForm from "./EnrolLtiLti2NonceForm";

export default function EnrolLtiLti2NonceModal({
  enrolLtiLti2Nonce,
  emptyState,
}: {
  enrolLtiLti2Nonce?: EnrolLtiLti2Nonce;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!enrolLtiLti2Nonce?.id;
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
            New Enrol Lti Lti2 Nonce
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
            {editing ? "Edit" : "Create"} Enrol Lti Lti2 Nonce
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <EnrolLtiLti2NonceForm
            closeModal={closeModal}
            enrolLtiLti2Nonce={enrolLtiLti2Nonce}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
