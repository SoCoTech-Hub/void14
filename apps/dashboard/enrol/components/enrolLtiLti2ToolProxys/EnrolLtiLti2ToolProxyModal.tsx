"use client";

import { useState } from "react";

import { EnrolLtiLti2ToolProxy } from "@soco/enrol-db/schema/enrolLtiLti2ToolProxys";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import EnrolLtiLti2ToolProxyForm from "./EnrolLtiLti2ToolProxyForm";

export default function EnrolLtiLti2ToolProxyModal({
  enrolLtiLti2ToolProxy,
  emptyState,
}: {
  enrolLtiLti2ToolProxy?: EnrolLtiLti2ToolProxy;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!enrolLtiLti2ToolProxy?.id;
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
            New Enrol Lti Lti2 Tool Proxy
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
            {editing ? "Edit" : "Create"} Enrol Lti Lti2 Tool Proxy
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <EnrolLtiLti2ToolProxyForm
            closeModal={closeModal}
            enrolLtiLti2ToolProxy={enrolLtiLti2ToolProxy}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
