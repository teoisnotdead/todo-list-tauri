export type ColumnId = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: ColumnId;
  createdAt: number;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
}

export const COLUMNS: Column[] = [
  { id: "todo", title: "Por hacer", color: "from-violet-500/20 to-violet-600/10" },
  { id: "in-progress", title: "En progreso", color: "from-amber-500/20 to-amber-600/10" },
  { id: "done", title: "Completado", color: "from-emerald-500/20 to-emerald-600/10" },
];
