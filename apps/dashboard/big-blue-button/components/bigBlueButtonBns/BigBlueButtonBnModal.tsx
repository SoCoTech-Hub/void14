"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { BigBlueButtonBn } from "@soco/big-blue-button-db/schema/bigBlueButtonBns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import BigBlueButtonBnForm from "./BigBlueButtonBnForm";

export default function BigBlueButtonBnModal({
  bigBlueButtonBn,
  emptyState,
}: {
  bigBlueButtonBn?: BigBlueButtonBn;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!bigBlueButtonBn?.id;
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
            New Big Blue Button Bn
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
      <DialogContent className="custom-scrollbar my-4 max-h-screen overflow-auto">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>
            {editing ? "Edit" : "Create"} Big Blue Button Bn
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <BigBlueButtonBnForm
            closeModal={closeModal}
            bigBlueButtonBn={bigBlueButtonBn}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
