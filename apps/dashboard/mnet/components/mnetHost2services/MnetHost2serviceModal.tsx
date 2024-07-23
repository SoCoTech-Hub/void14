"use client";

import { useState } from "react";

import { MnetHost2service } from "@soco/mnet-db/schema/mnetHost2services";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import MnetHost2serviceForm from "./MnetHost2serviceForm";

export default function MnetHost2serviceModal({
  mnetHost2service,
  emptyState,
}: {
  mnetHost2service?: MnetHost2service;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!mnetHost2service?.id;
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
            New Mnet Host2service
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
            {editing ? "Edit" : "Create"} Mnet Host2service
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <MnetHost2serviceForm
            closeModal={closeModal}
            mnetHost2service={mnetHost2service}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
