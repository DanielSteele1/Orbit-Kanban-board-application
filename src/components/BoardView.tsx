import { useState, useEffect } from 'react';
import Column from './Column.tsx';
import AddColumn from './AddColumn.tsx';
import { FiEdit3 } from "react-icons/fi";
import { useParams } from 'react-router-dom';

import type { ColumnType } from '../types.ts';
import type { BoardType } from '../types.ts';

function BoardView() {

    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<BoardType | null>(null);

    useEffect(() => {
        const savedBoards = localStorage.getItem('boards');
        if (savedBoards && boardId) {
            const boards: BoardType[] = JSON.parse(savedBoards);
            const found = boards.find(b => b.id.toString() === boardId);
            setBoard(found ?? null);
        }
    }, [boardId]);

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

    const handleDeleteColumn = (columnId: number) => {
        setColumns(prev =>
            prev.filter(col => col.id !== columnId)
        );
    };

    // Add a new task to a specific column

    const handleAddTask = (columnId: number) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: [
                            ...col.tasks, // existing tasks
                            { id: Date.now(), text: '' } // new task
                        ]
                    }
                    : col
            )
        );
    };

    const handleDeleteTask = (columnId: number, taskId: number) => {

        setColumns(prev =>

            prev.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.filter(task => task.id !== taskId)

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

    // Update the names/description of each board when edited into updatedBoards, 
    // then map over savedBoards with updatedBoards back to localStorage.

    const handleBoardText = (field: 'title' | 'description', value: string) => {

        setBoard(prev => {
            if (!prev) return prev; 

            const updatedBoard = { ...prev, [field]: value };

            const savedBoards = localStorage.getItem('boards'); 

            if (savedBoards) {

                const boards: BoardType[] = JSON.parse(savedBoards); 
                const updatedBoards = boards.map(b => b.id === updatedBoard.id ? updatedBoard : b);

                localStorage.setItem('boards', JSON.stringify(updatedBoards));
            }
            return updatedBoard;

        });
    };

    if (!board) return <div> Loading or Board not found... </div>;

    // get the board descrtion and title here - the idea is to make the user declare it in the main screen, then when they get to each board, it's just there.

    return (
        <div className="Board">
            <div className="controls">
                <div className="board-text">
                    <div className="title">

                        <input
                            className="board-title-input"
                            id="gradient"
                            placeholder="Untitled Board"
                            value={board.title}
                            onChange={(e) => handleBoardText('title', e.target.value)}

                        />

                        <textarea
                            className="board-description-input"
                            placeholder="Click to add a description"
                            value={board.description}
                            onChange={(e) => handleBoardText('description', e.target.value)}
                        />

                    </div>
                    <div className="board-date">
                        Board ID: {board.id}
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
                            handleDeleteColumn={() => handleDeleteColumn(col.id)}
                            handleAddTasks={() => handleAddTask(col.id)}
                            handleDeleteTasks={(taskId: number) => handleDeleteTask(col.id, taskId)}
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