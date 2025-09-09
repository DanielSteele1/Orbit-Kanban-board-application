

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

export interface BoardType {

    id: number;
    title: string;
    description: string;
    columns: ColumnType[]
    creationDate: number

}
