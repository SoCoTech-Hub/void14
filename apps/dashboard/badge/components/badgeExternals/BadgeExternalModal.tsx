"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { BadgeExternal } from "@soco/badge-db/schema/badgeExternals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import BadgeExternalForm from "./BadgeExternalForm";

export default function BadgeExternalModal({
  badgeExternal,
  emptyState,
}: {
  badgeExternal?: BadgeExternal;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!badgeExternal?.id;
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
            New Badge External
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
            {editing ? "Edit" : "Create"} Badge External
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <BadgeExternalForm
            closeModal={closeModal}
            badgeExternal={badgeExternal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
