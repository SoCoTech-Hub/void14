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
import Oauth2RefreshTokenForm from "./Oauth2RefreshTokenForm";
import { Oauth2RefreshToken } from "@soco/oauth2-db/schema/oauth2RefreshTokens";

export default function Oauth2RefreshTokenModal({ 
  oauth2RefreshToken,
  emptyState,
}: { 
  oauth2RefreshToken?: Oauth2RefreshToken;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!oauth2RefreshToken?.id;
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
            New Oauth2 Refresh Token
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Oauth2 Refresh Token</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <Oauth2RefreshTokenForm closeModal={closeModal} oauth2RefreshToken={oauth2RefreshToken} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
