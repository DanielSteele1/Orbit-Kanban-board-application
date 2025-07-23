
import { useState } from 'react';
import Column from './Column.tsx';
import AddColumn from './AddColumn.tsx';
import { FaPlus } from "react-icons/fa";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

interface Task {
    id: number;
    text: string;
}

interface ColumnType {
    id: number;
    title: string;
    tasks: Task[];
}

function Main() {
    const [columns, setColumns] = useState<ColumnType[]>([]);

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
                            { id: Date.now(), text: 'New Task' }
                        ]
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
                    />
                ))}
                <AddColumn handleAddColumn={handleAddColumn} />
            </div>
        </div>
    );
}

export default Main;
