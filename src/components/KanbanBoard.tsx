import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { COLUMNS } from "@/lib/types";
import type { Task } from "@/lib/types";
import { useTodoStore } from "@/store/useTodoStore";
import { Column } from "@/components/Column";
import { TaskCard } from "@/components/TaskCard";
import { CheckSquare, Sparkles } from "lucide-react";

export function KanbanBoard() {
  const { tasks, moveTask } = useTodoStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Dropped over a column
    const isColumn = COLUMNS.some((c) => c.id === overId);
    if (isColumn) {
      moveTask(activeId, overId as "todo" | "in-progress" | "done");
      return;
    }

    // Dropped over another task
    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    if (activeTask.columnId !== overTask.columnId) {
      moveTask(activeId, overTask.columnId);
    }

    const tasksArr = useTodoStore.getState().tasks;
    const activeIndex = tasksArr.findIndex((t) => t.id === activeId);
    const overIndex = tasksArr.findIndex((t) => t.id === overId);
    if (activeIndex !== overIndex) {
      useTodoStore.setState({ tasks: arrayMove(tasksArr, activeIndex, overIndex) });
    }
  }

  const tasksByColumn = COLUMNS.reduce<Record<string, Task[]>>((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.columnId === col.id);
    return acc;
  }, {});

  const done = tasksByColumn["done"]?.length ?? 0;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="page-bg h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="header-glass flex-shrink-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
              <CheckSquare className="h-4.5 w-4.5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight tracking-tight">
                TaskFlow
              </h1>
              <p className="text-[11px] text-muted-foreground">
                {total} {total === 1 ? "tarea" : "tareas"} · {done} completadas
              </p>
            </div>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-violet-400" />
                Progreso general
              </span>
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground tabular-nums">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Board — fills remaining height */}
      <main className="flex-1 overflow-hidden px-6 py-6 max-w-6xl w-full mx-auto">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={tasksByColumn[col.id] ?? []}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <div className="rotate-1 scale-105 opacity-95 shadow-2xl shadow-violet-500/20">
                <TaskCard task={activeTask} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
