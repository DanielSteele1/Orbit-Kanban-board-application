import { FaPlus } from "react-icons/fa";
import { GrDrag } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import TaskComponent from "./Task";
import type { Task as TaskType } from "../types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ColumnProps = {
    columnId: number;
    title: string;
    tasks: TaskType[];
    handleAddTasks: () => void;
    handleDeleteTasks: (taskId: number) => void;
    handleToggleIsCompleted: (taskId: number) => void;
    handleTaskTextChange: (taskId: number, newText: string) => void;
    handleTitleChange: (columnId: number, newTitle: string) => void;
    handleDeleteColumn: (columnId: any) => void;
};

const Column = ({ columnId, title, tasks, handleDeleteColumn, handleAddTasks, handleDeleteTasks, handleToggleIsCompleted, handleTaskTextChange, handleTitleChange }: ColumnProps) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: columnId });

    const style = {

        transform: CSS.Transform.toString(transform),
        transition,
        width: "inherit",
    };

    return (

        <div className="column" ref={setNodeRef} {...attributes} style={style}>
            <div className="column-title">
                <input
                    className="column-name"
                    value={title}
                    placeholder="Edit Title"
                    onChange={(e) => handleTitleChange(columnId, e.target.value)}

                />
                <div className="icons">
                    <span className="icon"
                        onClick={handleDeleteColumn}
                    >
                        <FiTrash
                            style={{ display: 'flex', marginRight: '10px', verticalAlign: 'middle', cursor: 'pointer' }}
                        />

                    </span>

                    <span className="icon" {...listeners} id="drag-icon">
                        <GrDrag id="drag-icon" style={{ display: 'flex', marginRight: '10px', verticalAlign: 'middle' }}
                        />
                    </span>

                </div>
            </div>

            {tasks.map(task => (
                <TaskComponent
                    id={task.id}
                    text={task.text}
                    isCompleted={task.isCompleted}
                    handleDeleteTasks={() => handleDeleteTasks(task.id)}
                    onToggleIsCompleted={() => handleToggleIsCompleted(task.id)}
                    onTextChange={newText => handleTaskTextChange(task.id, newText)}
                />
            ))}

            <span className="add-task">
                <button id="button-text" onClick={handleAddTasks}>
                    <FaPlus style={{ marginRight: '10px', fontSize: '15px' }} />
                    Add new task
                </button>

            </span>
        </div>
    );
};

export default Column;
