import { FaPlus } from "react-icons/fa";
import { GrDrag } from "react-icons/gr";
import { TfiMore } from "react-icons/tfi";
import Task from "./Task"

type Task = {
    id: number;
    text: string;
};

type ColumnProps = {
    title: string;
    tasks: Task[];
    handleAddTasks: () => void;
};

const Column = ({ title, tasks, handleAddTasks }: ColumnProps) => {
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
                <div key={task.id}>
                   <Task />
                </div>
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
