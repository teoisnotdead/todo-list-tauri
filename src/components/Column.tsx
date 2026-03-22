import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Column as ColumnType, Task } from "@/lib/types";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

// Per-column accent config
const ACCENTS: Record<string, { accent: string; badge: string; dot: string }> = {
  "todo": {
    accent: "col-accent-todo",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    dot: "bg-violet-400",
  },
  "in-progress": {
    accent: "col-accent-progress",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    dot: "bg-amber-400",
  },
  "done": {
    accent: "col-accent-done",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
};

export function Column({ column, tasks }: ColumnProps) {
  const [addOpen, setAddOpen] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const cfg = ACCENTS[column.id];

  return (
    <>
      <div
        className={cn(
          "glass-card flex flex-col rounded-2xl h-full w-full transition-all duration-200",
          cfg.accent,
          isOver && "ring-2 ring-violet-500/40 shadow-lg shadow-violet-500/10 scale-[1.01]"
        )}
      >
        {/* Column header */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
            <h2 className="font-semibold text-sm text-foreground tracking-wide">
              {column.title}
            </h2>
            <span
              className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border",
                cfg.badge
              )}
            >
              {tasks.length}
            </span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-white/10"
            onClick={() => setAddOpen(true)}
            aria-label={`Agregar tarea a ${column.title}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mx-4" />

        {/* Task list */}
        <div ref={setNodeRef} className="flex flex-col gap-2.5 p-3 flex-1 overflow-y-auto min-h-0">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>

          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 gap-2 py-12 text-center">
              <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center">
                <Plus className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground/50 mt-1">Sin tareas aquí</p>
              <button
                onClick={() => setAddOpen(true)}
                className="text-xs text-violet-400/70 hover:text-violet-400 transition-colors cursor-pointer mt-0.5"
              >
                + Agregar una tarea
              </button>
            </div>
          )}
        </div>
      </div>

      <AddTaskDialog
        columnId={column.id}
        open={addOpen}
        onOpenChange={setAddOpen}
      />
    </>
  );
}
