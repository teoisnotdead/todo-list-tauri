# TaskFlow — Kanban TODO App

Una aplicación de escritorio de tablero Kanban construida con **Tauri v2**, **React 19** y **TypeScript**. Permite organizar tareas en tres columnas arrastrando y soltando, con persistencia automática en el almacenamiento local.

---

## 🚀 Características

- **Tablero Kanban** con tres columnas: *Por hacer*, *En progreso* y *Completado*
- **Drag & Drop** — arrastra tarjetas entre columnas o reordénalas dentro de la misma columna
- **CRUD de tareas** — crea, edita y elimina tareas con título y descripción opcional
- **Barra de progreso** en tiempo real que muestra el porcentaje de tareas completadas
- **Persistencia automática** — el estado se guarda en `localStorage` entre sesiones
- **Diseño glassmorfismo** con gradientes y animaciones suaves
- **App nativa** de escritorio (Windows, macOS, Linux) gracias a Tauri

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework de escritorio | [Tauri v2](https://tauri.app/) + Rust |
| UI | [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/) |
| Bundler | [Vite 7](https://vitejs.dev/) |
| Estado global | [Zustand 5](https://zustand-demo.pmnd.rs/) (con middleware `persist`) |
| Drag & Drop | [@dnd-kit/core](https://dndkit.com/) + `@dnd-kit/sortable` |
| Estilos | [TailwindCSS v4](https://tailwindcss.com/) + PostCSS |
| Componentes UI | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) |
| Íconos | [Lucide React](https://lucide.dev/) |
| Tipografía | Geist Variable (`@fontsource-variable/geist`) |

---

## 📋 Requisitos previos

Antes de instalar el proyecto asegúrate de tener:

- **Node.js** ≥ 18 — [descargar](https://nodejs.org/)
- **pnpm** — gestor de paquetes (`npm install -g pnpm`)
- **Rust** (toolchain estable) — [instalar con rustup](https://rustup.rs/)
- **Dependencias de Tauri** según tu sistema operativo — [guía oficial](https://tauri.app/start/prerequisites/)

### Dependencias de Tauri en Windows

```powershell
# Instalar Microsoft C++ Build Tools y WebView2 (si no están presentes)
# Seguir: https://tauri.app/start/prerequisites/#windows
```

---

## 📦 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/teoisnotdead/todo-list-tauri.git
cd todo-list-tauri

# 2. Instalar dependencias de Node
pnpm install
```

---

## ▶️ Levantar el proyecto

### Modo desarrollo (app de escritorio nativa)

```bash
pnpm tauri dev
```

> Esto lanza el servidor Vite (`http://localhost:1420`) y abre la ventana de escritorio nativa de Tauri.

### Solo frontend en el navegador

```bash
pnpm dev
```

> Útil para trabajar únicamente en la UI sin compilar Rust.

---

## 🏗️ Build de producción

```bash
# Compila el frontend y genera el instalador nativo
pnpm tauri build
```

El instalador/ejecutable quedará en `src-tauri/target/release/bundle/`.

---

## 📁 Estructura del proyecto

```
get-started-docs/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.tsx   # Tablero principal + lógica DnD
│   │   ├── Column.tsx        # Columna droppable
│   │   ├── TaskCard.tsx      # Tarjeta draggable
│   │   ├── AddTaskDialog.tsx # Diálogo para crear tareas
│   │   ├── EditTaskDialog.tsx# Diálogo para editar tareas
│   │   └── ui/               # Componentes base (shadcn/ui)
│   ├── store/
│   │   └── useTodoStore.ts   # Store Zustand (CRUD + DnD + persist)
│   ├── lib/
│   │   ├── types.ts          # Tipos Task, Column, ColumnId
│   │   └── utils.ts          # Utilidades (cn)
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/                # Código Rust y configuración Tauri
│   ├── tauri.conf.json       # Configuración de la app nativa
│   └── src/                  # Backend Rust
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🖥️ IDE recomendado

- [VS Code](https://code.visualstudio.com/) con las extensiones:
  - [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
