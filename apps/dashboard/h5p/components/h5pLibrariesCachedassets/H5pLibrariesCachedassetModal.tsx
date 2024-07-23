"use client";

import { useState } from "react";

import { H5pLibrariesCachedasset } from "@soco/h5p-db/schema/h5pLibrariesCachedassets";
import { Button } from "@soco/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@soco/ui/dialog";

import H5pLibrariesCachedassetForm from "./H5pLibrariesCachedassetForm";

export default function H5pLibrariesCachedassetModal({
  h5pLibrariesCachedasset,
  emptyState,
}: {
  h5pLibrariesCachedasset?: H5pLibrariesCachedasset;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!h5pLibrariesCachedasset?.id;
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
            New H5p Libraries Cachedasset
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
            {editing ? "Edit" : "Create"} H5p Libraries Cachedasset
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <H5pLibrariesCachedassetForm
            closeModal={closeModal}
            h5pLibrariesCachedasset={h5pLibrariesCachedasset}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
