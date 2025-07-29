
import React, { useEffect, useRef } from "react";
import 'react-dropdown/style.css';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { TfiMore } from "react-icons/tfi";;
import { MdOutlineCheckBox } from "react-icons/md";

import type { Task as TaskType } from "../types";

interface TaskProps extends TaskType {
    onToggleIsCompleted: () => void;
    onTextChange: (newText: string) => void;
}

const Task: React.FC<TaskProps> = ({ text, onToggleIsCompleted, isCompleted, onTextChange }) => {


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
                        placeholder="Enter new task..."
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
                        <div id="icon" className="icon-copy"> <TfiMore style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} /></div>
                    </span>

                    {/* <span className="icon">
                        <div id="icon" className="icon-copy"> <FiCopy style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} /></div>
                    </span>

                    <span className="icon">
                        <div id="icon" className="icon-delete"> <FiTrash style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} /> </div>
                    </span> */}
                </div>
            </div>
        </div>
    )
}

export default Task;
