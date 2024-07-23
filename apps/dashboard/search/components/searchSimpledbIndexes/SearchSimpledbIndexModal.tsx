"use client";

import { useState } from "react";

import { SearchSimpledbIndex } from "@soco/search-db/schema/searchSimpledbIndexes";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import SearchSimpledbIndexForm from "./SearchSimpledbIndexForm";

export default function SearchSimpledbIndexModal({
  searchSimpledbIndex,
  emptyState,
}: {
  searchSimpledbIndex?: SearchSimpledbIndex;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!searchSimpledbIndex?.id;
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
            New Search Simpledb Index
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
            {editing ? "Edit" : "Create"} Search Simpledb Index
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <SearchSimpledbIndexForm
            closeModal={closeModal}
            searchSimpledbIndex={searchSimpledbIndex}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
