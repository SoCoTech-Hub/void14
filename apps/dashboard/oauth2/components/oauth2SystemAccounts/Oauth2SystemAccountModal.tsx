"use client";

import { useState } from "react";

import { Oauth2SystemAccount } from "@soco/oauth2-db/schema/oauth2SystemAccounts";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import Oauth2SystemAccountForm from "./Oauth2SystemAccountForm";

export default function Oauth2SystemAccountModal({
  oauth2SystemAccount,
  emptyState,
}: {
  oauth2SystemAccount?: Oauth2SystemAccount;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!oauth2SystemAccount?.id;
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
            New Oauth2 System Account
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
            {editing ? "Edit" : "Create"} Oauth2 System Account
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <Oauth2SystemAccountForm
            closeModal={closeModal}
            oauth2SystemAccount={oauth2SystemAccount}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
