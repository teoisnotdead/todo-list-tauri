import { useState } from "react";
import { useTodoStore } from "@/store/useTodoStore";
import type { ColumnId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddTaskDialogProps {
  columnId: ColumnId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({ columnId, open, onOpenChange }: AddTaskDialogProps) {
  const addTask = useTodoStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    addTask(title.trim(), description.trim(), columnId);
    setTitle("");
    setDescription("");
    onOpenChange(false);
  }

  function handleClose() {
    setTitle("");
    setDescription("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nueva tarea</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="add-title">Título *</Label>
            <Input
              id="add-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="¿Qué hay que hacer?"
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="add-desc">Descripción</Label>
            <Textarea
              id="add-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Detalles opcionales..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAdd} disabled={!title.trim()}>
            Agregar tarea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
