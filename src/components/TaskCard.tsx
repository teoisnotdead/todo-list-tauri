import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/lib/types";
import { useTodoStore } from "@/store/useTodoStore";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useTodoStore((s) => s.deleteTask);
  const [editOpen, setEditOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "task-card group relative flex gap-2.5 rounded-xl p-3.5",
          isDragging && "opacity-40 scale-95"
        )}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 flex-shrink-0 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 transition-colors touch-none"
          aria-label="Arrastrar tarea"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground leading-snug break-words">
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1.5 text-xs text-muted-foreground/80 line-clamp-2 break-words leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-white/30 hover:text-white hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); setEditOpen(true); }}
            aria-label="Editar tarea"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-white/30 hover:text-red-400 hover:bg-red-400/10"
            onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
            aria-label="Eliminar tarea"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <EditTaskDialog task={task} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}
