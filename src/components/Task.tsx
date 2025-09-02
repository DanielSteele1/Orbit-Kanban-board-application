
import React, { useEffect, useRef } from "react";
import 'react-dropdown/style.css';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { MdOutlineCheckBox } from "react-icons/md";

import type { Task as TaskType } from "../types";
import TaskDropdown from "./TaskDropdown.tsx"

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

interface TaskProps extends TaskType {
    onToggleIsCompleted: () => void;
    onTextChange: (newText: string) => void;
    handleDeleteTasks: (taskId: number) => void;
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


    const handleCopy = (text: string) => {

        Toastify({
            text: "Text copied to clipboard.",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: '#292929',
                color: '#ff4e50',
                boxShadow: 'none',
                display: 'flex',
                width: 'fit-content',
                padding: '10px'


            },
            onClick: function () { }
        }).showToast();

        navigator.clipboard.writeText(text);
    }

    return (
        <div className="Task-container">
            <div className="Task">

                <div className="icons">
                    <span className="icon">

                        {isCompleted ? (
                            <MdOutlineCheckBox
                                style={{ display: 'flex', marginTop: '5px', verticalAlign: 'middle', cursor: 'pointer' }}
                                onClick={onToggleIsCompleted}
                            />
                        ) : (
                            <MdOutlineCheckBoxOutlineBlank
                                style={{ display: 'flex', marginTop: '5px', verticalAlign: 'middle', cursor: 'pointer' }}
                                onClick={onToggleIsCompleted}
                            />
                        )}
                    </span>
                </div>

                <span className="task-text">
                    <textarea
                        ref={textAreaRef}
                        value={text}
                        style={{
                            textDecoration: isCompleted ? 'line-through' : 'none',
                            color: isCompleted ? '' : 'white'
                        }}
                        onChange={e => onTextChange(e.target.value)}
                        className="task-input"
                        maxLength={300}
                        placeholder="Enter new task.."
                    />
                </span>
                <div className="icons">
                    <span className="icon">
                        <div id="icon" className="icon-copy">
                            <TaskDropdown text={text} handleDeleteTasks={handleDeleteTasks} handleCopy={handleCopy} />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Task;
