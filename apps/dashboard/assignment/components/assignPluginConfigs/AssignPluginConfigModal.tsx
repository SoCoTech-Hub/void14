"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AssignPluginConfigForm from "./AssignPluginConfigForm";
import { AssignPluginConfig } from "@soco/assignment-db/schema/assignPluginConfigs";

export default function AssignPluginConfigModal({ 
  assignPluginConfig,
  emptyState,
}: { 
  assignPluginConfig?: AssignPluginConfig;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!assignPluginConfig?.id;
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
            New Assign Plugin Config
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Assign Plugin Config</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <AssignPluginConfigForm closeModal={closeModal} assignPluginConfig={assignPluginConfig} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
