import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InstallationModal = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Installation Guidelines</DialogTitle>
          <DialogDescription>
            Grab your USB drive, and create a folder called &ldquo;Wraps&rdquo;
            at the root level of the &ldquo;TSLADRIVE&rdquo;. Place the images
            in that folder.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InstallationModal;
