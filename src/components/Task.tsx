
import React, { useEffect, useRef } from "react";
import 'react-dropdown/style.css';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { MdOutlineCheckBox } from "react-icons/md";

import type { Task as TaskType } from "../types";
import TaskDropdown  from "./TaskDropdown.tsx"

interface TaskProps extends TaskType {
    onToggleIsCompleted: () => void;
    onTextChange: (newText: string) => void;
    handleDeleteTasks: (taskId: any) => void;
}


const Task: React.FC<TaskProps> = ({ handleDeleteTasks, text, onToggleIsCompleted, isCompleted, onTextChange }) => {

    // resizes textarea so that it automatically grows and shrinks with content.
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'; // Reset height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to scroll height
        }
    }, [text]);


    return (
        <div className="Task-container">
            <div className="Task">
                <span className="task-text">
                    <textarea
                        ref={textAreaRef}
                        value={text}
                        onChange={e => onTextChange(e.target.value)}
                        className="task-input"
                        placeholder="Enter new task.."
                    />
                </span>
                <div className="icons">
                    <span className="icon">

                        {isCompleted ? (
                            <MdOutlineCheckBox
                                style={{ display: 'flex', margin: '5px', verticalAlign: 'middle', cursor: 'pointer' }}
                                onClick={onToggleIsCompleted}
                            />
                        ) : (
                            <MdOutlineCheckBoxOutlineBlank
                                style={{ display: 'flex', margin: '5px', verticalAlign: 'middle', cursor: 'pointer' }}
                                onClick={onToggleIsCompleted}
                            />
                        )}
                    </span>

                    <span className="icon">
                        <div id="icon" className="icon-copy">
                            <TaskDropdown handleDeleteTasks={handleDeleteTasks}/>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Task;
