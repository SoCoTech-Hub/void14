"use client";

import { useState } from "react";

import { CompetencyEvidence } from "@soco/competency-db/schema/competencyEvidences";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import CompetencyEvidenceForm from "./CompetencyEvidenceForm";

export default function CompetencyEvidenceModal({
  competencyEvidence,
  emptyState,
}: {
  competencyEvidence?: CompetencyEvidence;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!competencyEvidence?.id;
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
            New Competency Evidence
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
            {editing ? "Edit" : "Create"} Competency Evidence
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <CompetencyEvidenceForm
            closeModal={closeModal}
            competencyEvidence={competencyEvidence}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
