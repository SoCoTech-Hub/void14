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
import Oauth2UserFieldMappingForm from "./Oauth2UserFieldMappingForm";
import { Oauth2UserFieldMapping } from "@soco/oauth2-db/schema/oauth2UserFieldMappings";

export default function Oauth2UserFieldMappingModal({ 
  oauth2UserFieldMapping,
  emptyState,
}: { 
  oauth2UserFieldMapping?: Oauth2UserFieldMapping;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!oauth2UserFieldMapping?.id;
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
            New Oauth2 User Field Mapping
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
          <DialogTitle>{ editing ? "Edit" : "Create" } Oauth2 User Field Mapping</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <Oauth2UserFieldMappingForm closeModal={closeModal} oauth2UserFieldMapping={oauth2UserFieldMapping} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
