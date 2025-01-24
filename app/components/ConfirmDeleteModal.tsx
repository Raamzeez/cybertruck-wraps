import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleDelete: () => void;
}

const ConfirmDeleteModal = ({ open, onOpenChange, handleDelete }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            This action is irreversible, are you sure you want to delete this
            wrap?
          </DialogDescription>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={handleDelete}
          >
            Confirm Delete
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
