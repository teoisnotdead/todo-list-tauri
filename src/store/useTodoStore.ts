import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, ColumnId } from "@/lib/types";

interface TodoState {
  tasks: Task[];
  addTask: (title: string, description: string, columnId: ColumnId) => void;
  updateTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, columnId: ColumnId) => void;
  reorderTasks: (activeId: string, overId: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "sample-1",
          title: "Diseñar UI del proyecto",
          description: "Crear mockups y paleta de colores",
          columnId: "done",
          createdAt: Date.now() - 86400000,
        },
        {
          id: "sample-2",
          title: "Configurar base de datos",
          description: "Elegir entre PostgreSQL o SQLite",
          columnId: "in-progress",
          createdAt: Date.now() - 43200000,
        },
        {
          id: "sample-3",
          title: "Implementar autenticación",
          description: "JWT con refresh tokens",
          columnId: "todo",
          createdAt: Date.now() - 3600000,
        },
        {
          id: "sample-4",
          title: "Escribir tests",
          columnId: "todo",
          createdAt: Date.now(),
        },
      ],

      addTask: (title, description, columnId) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              description,
              columnId,
              createdAt: Date.now(),
            },
          ],
        })),

      updateTask: (id, title, description) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, title, description } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      moveTask: (id, columnId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, columnId } : t
          ),
        })),

      reorderTasks: (activeId, overId) =>
        set((state) => {
          const tasks = [...state.tasks];
          const activeIndex = tasks.findIndex((t) => t.id === activeId);
          const overIndex = tasks.findIndex((t) => t.id === overId);
          if (activeIndex === -1 || overIndex === -1) return state;
          const [active] = tasks.splice(activeIndex, 1);
          tasks.splice(overIndex, 0, active);
          return { tasks };
        }),
    }),
    { name: "todo-store" }
  )
);
