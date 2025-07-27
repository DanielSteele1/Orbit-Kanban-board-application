// src/types.ts

export interface Task {
    id: number;
    text: string;
    isCompleted?: boolean;
}

export interface ColumnType {
    id: number;
    title: string;
    tasks: Task[];
}
