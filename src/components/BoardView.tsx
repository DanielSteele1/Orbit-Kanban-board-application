import { useState, useEffect } from 'react';
import Column from './Column.tsx';
import AddColumn from './AddColumn.tsx';
import { useParams } from 'react-router-dom';

import type { ColumnType } from '../types.ts';
import type { BoardType } from '../types.ts';

import { DndContext, closestCorners, type DragEndEvent, useSensor, useSensors, KeyboardSensor, PointerSensor } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function BoardView() {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

    // Helper function to update localStorage
    const updateBoardInStorage = (updatedBoard: BoardType) => {
        const savedBoards = localStorage.getItem('boards');
        if (savedBoards) {
            const boards: BoardType[] = JSON.parse(savedBoards);
            const updatedBoards = boards.map(b => 
                b.id === updatedBoard.id ? updatedBoard : b
            );
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
        }
    };

    const handleAddColumn = () => {
        if (!board) return;
        
        const newColumn: ColumnType = {
            id: Date.now(),
            title: '',
            tasks: []
        };
        
        const updatedBoard = {
            ...board,
            columns: [...board.columns, newColumn]
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    const handleDeleteColumn = (columnId: number) => {
        if (!board) return;
        
        const updatedBoard = {
            ...board,
            columns: board.columns.filter(col => col.id !== columnId)
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    // Add a new task to a specific column
    const handleAddTask = (columnId: number) => {
        if (!board) return;

        const updatedBoard = {
            ...board,
            columns: board.columns.map(col =>
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
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    const handleDeleteTask = (columnId: number, taskId: number) => {
        if (!board) return;

        const updatedBoard = {
            ...board,
            columns: board.columns.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.filter(task => task.id !== taskId)
                    }
                    : col
            )
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    // handle title change for each column
    const handleTitleChange = (columnId: number, newTitle: string) => {
        if (!board) return;

        const updatedBoard = {
            ...board,
            columns: board.columns.map(col =>
                col.id === columnId
                    ? { ...col, title: newTitle }
                    : col
            )
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    // Toggle isCompleted for specific task
    const handleToggleIsCompleted = (columnId: number, taskId: number) => {
        if (!board) return;

        const updatedBoard = {
            ...board,
            columns: board.columns.map(col =>
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
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    // Update text for a specific task in a specific column
    const handleTaskTextChange = (columnId: number, taskId: number, newText: string) => {
        if (!board) return;

        const updatedBoard = {
            ...board,
            columns: board.columns.map(col =>
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
        };
        
        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
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

    //react-drag-and-drop

    function handleDragEnd(event: DragEndEvent) {
        if (!board) return;
        const { active, over } = event;

        if (active.id !== over?.id && over) {
            const updatedBoard = {
                ...board,
                columns: arrayMove(
                    board.columns,
                    board.columns.findIndex((col) => col.id === active.id),
                    board.columns.findIndex((col) => col.id === over.id)
                )
            };
            
            setBoard(updatedBoard);
            updateBoardInStorage(updatedBoard);
        }
    };


    if (!board) return <div> Loading or Board not found... </div>;

    // get the board descrtion and title here - the idea is to make the user declare it in the main screen, then when they get to each board, it's just there.

    return (

        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
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

                            <div className="board-id">
                                Board ID: {board.id}
                            </div>
                        </div>

                        <div className="board-desc">

                            <textarea
                                className="board-description-input"
                                placeholder="Click to add a description"
                                value={board.description}
                                onChange={(e) => handleBoardText('description', e.target.value)}
                            />

                        </div>

                    </div>

                </div>
                <div className="column-scroll-container">
                    <div className="column-container">

                        {board.columns.map(col => (
                            <SortableContext items={board.columns} strategy={horizontalListSortingStrategy}>
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
                            </SortableContext>

                        ))}
                        <AddColumn handleAddColumn={handleAddColumn} />
                    </div>
                </div>
            </div>
        </DndContext>

    );
}

export default BoardView;