

export interface Task {
    id: number;
    text: string;
    isCompleted?: boolean;
}

export interface ColumnType {
    text: string;
    id: number;
    title: string;
    tasks: Task[];
}

// either column, or notes. could be expanded if more features are added.
export type BoardItem = 
| { type: 'column'; data: ColumnType } 
| { type: 'note'; data: NoteType }

export interface BoardType {

    id: number;
    title: string;
    description: string;
    items: BoardItem[];
    creationDate: number;
}

export interface NoteType {

    id: number;
    title: string;
    text: string;
    creationDate: number;
}