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
import UserPrivateKeyForm from "./UserPrivateKeyForm";
import { UserPrivateKey } from "@soco/user-db/schema/userPrivateKeys";

export default function UserPrivateKeyModal({ 
  userPrivateKey,
  emptyState,
}: { 
  userPrivateKey?: UserPrivateKey;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!userPrivateKey?.id;
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
            New User Private Key
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
          <DialogTitle>{ editing ? "Edit" : "Create" } User Private Key</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <UserPrivateKeyForm closeModal={closeModal} userPrivateKey={userPrivateKey} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
