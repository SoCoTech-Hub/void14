"use client";

import { useState } from "react";

import { BadgeCriteriaParam } from "@soco/badge-db/schema/badgeCriteriaParams";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import BadgeCriteriaParamForm from "./BadgeCriteriaParamForm";

export default function BadgeCriteriaParamModal({
  badgeCriteriaParam,
  emptyState,
}: {
  badgeCriteriaParam?: BadgeCriteriaParam;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!badgeCriteriaParam?.id;
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
            New Badge Criteria Param
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
            {editing ? "Edit" : "Create"} Badge Criteria Param
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <BadgeCriteriaParamForm
            closeModal={closeModal}
            badgeCriteriaParam={badgeCriteriaParam}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
