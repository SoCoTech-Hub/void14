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
import MnetRemoteService2rpcForm from "./MnetRemoteService2rpcForm";
import { MnetRemoteService2rpc } from "@soco/mnet-db/schema/mnetRemoteService2rpcs";

export default function MnetRemoteService2rpcModal({ 
  mnetRemoteService2rpc,
  emptyState,
}: { 
  mnetRemoteService2rpc?: MnetRemoteService2rpc;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!mnetRemoteService2rpc?.id;
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
            New Mnet Remote Service2rpc
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Mnet Remote Service2rpc</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <MnetRemoteService2rpcForm closeModal={closeModal} mnetRemoteService2rpc={mnetRemoteService2rpc} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
