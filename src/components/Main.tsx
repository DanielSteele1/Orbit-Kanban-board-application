
import { useState, useEffect } from 'react';
import Column from './Column.tsx';
import AddColumn from './AddColumn.tsx';
import { FaPlus } from "react-icons/fa";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

import type { ColumnType } from '../types';

function Main() {

    // save each column into localStorage

    const [columns, setColumns] = useState<ColumnType[]>(() => {

        const saved = localStorage.getItem('columns');
        return saved ? JSON.parse(saved) : [];

    });

    useEffect(() => {
        localStorage.setItem('columns', JSON.stringify(columns));

    }, [columns]);

    // add a new column with no tasks

    const handleAddColumn = () => {
        const newColumn: ColumnType = {
            id: Date.now(),
            title: 'New Column',
            tasks: []
        };
        setColumns(prev => [...prev, newColumn]);
    };

    // Add a new task to a specific column

    const handleAddTask = (columnId: number) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: [
                            ...col.tasks,
                            { id: Date.now(), text: '' }
                        ]
                    }
                    : col
            )
        );
    };

    // Toggle isCompleted for specific task (taskID) in specific column (colId)

    const handleToggleIsCompleted = (columnId: number, taskId: number) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map(task =>
                            task.id === taskId
                                ? { ...task, isCompleted: !task.isCompleted }
                                : task
                        )
                    }
                    : col
            )
        );
    };

    // Update text for a specific task in a specific column

    const handleTaskTextChange = (columnId: number, taskId: number, newText: string) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map(task =>
                            task.id === taskId
                                ? { ...task, text: newText }
                                : task
                        )
                    }
                    : col
            )
        );
    };

    return (
        <div className="main">
            <div className="controls">
                <div className="board-text">
                    <div className="title">
                        <span className="board-title">
                            Board Title
                            <button id="icon"> <FiEdit3 style={{ fontSize: '20px' }} />
                            </button>
                        </span>
                        <span className="board-description">
                            This is a description of the board.
                            <button id="icon"> <FiEdit3 style={{ fontSize: '20px' }} />
                            </button>
                        </span>
                    </div>
                </div>
                <div className="taskbar">
                    <button id="button-text">
                        <FaPlus style={{ fontSize: '15px', marginRight: '10px' }} /> Add a new Board </button>
                    <button id="button-text">
                        <FiTrash style={{ fontSize: '15px', marginRight: '10px' }} /> Delete Board </button>
                    <button id="button-text">
                        <BsShare style={{ fontSize: '16px', marginRight: '10px' }} /> Share Board </button>
                    <button id="button-text">
                        <FiCopy style={{ fontSize: '15px', marginRight: '10px' }} /> Copy Board </button>
                </div>
            </div>
            <div className="column-container">
                {columns.map(col => (
                    <Column
                        key={col.id}
                        title={col.title}
                        tasks={col.tasks}
                        handleAddTasks={() => handleAddTask(col.id)}
                        handleToggleIsCompleted={taskId => handleToggleIsCompleted(col.id, taskId)}
                        handleTaskTextChange={(taskId, newText) => handleTaskTextChange(col.id, taskId, newText)}
                    />
                ))}
                <AddColumn handleAddColumn={handleAddColumn} />
            </div>
        </div>
    );
}

export default Main;
