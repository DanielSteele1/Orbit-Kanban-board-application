import { FaPlus } from "react-icons/fa";
import { GrDrag } from "react-icons/gr";
import { TfiMore } from "react-icons/tfi";
import TaskComponent from "./Task";
import type { Task as TaskType } from "../types";

type ColumnProps = {
    title: string;
    tasks: TaskType[];
    handleAddTasks: () => void;
    handleToggleIsCompleted: (taskId: number) => void;
    handleTaskTextChange: (taskId: number, newText: string) => void;
};


const Column = ({ title, tasks, handleAddTasks, handleToggleIsCompleted, handleTaskTextChange }: ColumnProps) => {

    return (
        <div className="column">
            <div className="column-title">
                <span className="column-name">{title}</span>
                <div className="icons">
                    <span className="icon-container options">
                        <TfiMore />
                    </span>
                    <span className="icon-container Drag">
                        <GrDrag />
                    </span>
                </div>
            </div>

            {tasks.map(task => (
                <TaskComponent
                    id={task.id}
                    text={task.text}
                    isCompleted={task.isCompleted}
                    onToggleIsCompleted={() => handleToggleIsCompleted(task.id)}
                    onTextChange={newText => handleTaskTextChange(task.id, newText)}
                />
            ))}

            <span className="add-task">
                <button id="button-text" onClick={handleAddTasks}>
                    <FaPlus style={{ margin: '10px', fontSize: '15px' }} />
                    Add a new task
                </button>
            </span>
        </div>
    );
};

export default Column;
