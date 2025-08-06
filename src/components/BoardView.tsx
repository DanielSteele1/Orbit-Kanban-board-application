import { useState, useEffect } from 'react';
import Column from './Column.tsx';
import AddColumn from './AddColumn.tsx';
import { FiEdit3 } from "react-icons/fi";

import type { ColumnType } from '../types.ts';
// import type { BoardType } from '../types.ts';

function BoardView() {

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
            title: '',
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

    // handle titlle change for each column

    const handleTitleChange = (columnId: number, newTitle: string) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? { ...col, title: newTitle }
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

    // get the board descrtion and title here - the idea is to make the user declare it in the main screen, then when they get to each board, it's just there.
    
    return (
        <div className="Board">
            <div className="controls">
                <div className="board-text">
                    <div className="title">
                        <span className="board-title">
                            {/* {board.title}  */}
                            <button id="icon"> <FiEdit3 style={{ fontSize: '20px' }} />
                            </button>
                        </span>
                        <span className="board-description">
                            {/* {board.description} */}
                            <button id="icon"> <FiEdit3 style={{ fontSize: '20px' }} />
                            </button>
                        </span>
                    </div>
                </div>

            </div>
            <div className="column-scroll-container">
                <div className="column-container">
                    {columns.map(col => (
                        <Column
                            key={col.id}
                            columnId={col.id}
                            title={col.title}
                            tasks={col.tasks}
                            handleAddTasks={() => handleAddTask(col.id)}
                            handleToggleIsCompleted={taskId => handleToggleIsCompleted(col.id, taskId)}
                            handleTaskTextChange={(taskId, newText) => handleTaskTextChange(col.id, taskId, newText)}
                            handleTitleChange={handleTitleChange}
                        />
                    ))}
                    <AddColumn handleAddColumn={handleAddColumn} />
                </div>
            </div>
        </div>

    );
}

export default BoardView;
