import { FaPlus } from "react-icons/fa";
import { GrDrag } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import TaskComponent from "./Task";
import type { Task as TaskType } from "../types";

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

    return (
        <div className="column">
            <div className="column-title">
                <input
                    className="column-name"
                    value={title}
                    placeholder="New List"
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

                    <span className="icon">
                        <GrDrag style={{ display: 'flex', marginRight: '10px', verticalAlign: 'middle', cursor: 'pointer' }}
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
                    <FaPlus style={{ marginRight: '10px',fontSize: '15px' }} />
                    Add new task
                </button>

            </span>
        </div>
    );
};

export default Column;
