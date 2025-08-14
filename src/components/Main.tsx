
import { useState, useEffect } from 'react';
import BoardTile from "./BoardTile";

import type { BoardType } from '../types';
import { FaPlus } from 'react-icons/fa';

import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";

function Main() {

    // save boards to local storage 

    const [boards, setBoards] = useState<BoardType[]>(() => {

        const saved = localStorage.getItem('boards');
        return saved ? JSON.parse(saved) : [];

    });

    useEffect(() => {

        localStorage.setItem('boards', JSON.stringify(boards));

    }, [boards])


    const handleAddBoard = () => {

        const newBoard: BoardType = {

            id: Date.now(),
            title: 'Untitled Board',
            description: 'No Description Yet',
            columns: []

        };
        setBoards(prev => [...prev, newBoard]);
    };

    // delete a board

    const handleDeleteBoard = (boardId: number) => {

        setBoards(prev =>
            prev.filter(board => board.id !== boardId)
        );

    };


    function handleDragEnd(event: DragEndEvent) {

        const { active, over } = event;

        if (active.id !== over?.id && over) {
            setBoards((boards) => {
                const oldIndex = boards.findIndex((b) => b.id === active.id);
                const newIndex = boards.findIndex((b) => b.id === over.id);

                return arrayMove(boards, oldIndex, newIndex);
            });
        }
    };


    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="main">

                <div className="taskbar">

                    <span className="intro">

                        <span className="App-title" id="gradient"> Welcome to _____ ! </span>

                        <span className="App-desc">
                            Phalanx helps you organize your projects and tasks with ease.
                            Create multiple boards to separate different areas of your work or life.
                            You can re-order each board element inside each board to maintain full control of your workflow.
                            Inside each board, you can add columns to categorize tasks and track progress step-by-step.
                        </span>
                        <span id="gradient" className="App-desc"> Click on the 'Add a Board' button to get started. </span>

                    </span>

                    <button id="button-text"
                        className="add-board"
                        onClick={handleAddBoard}>
                        <FaPlus style={{ fontSize: '20px', margin: '5px' }} /> Add a New Board </button>

                </div>

                <SortableContext
                    items={boards}
                    strategy={horizontalListSortingStrategy}>
                    <div className="board-grid">

                        {boards.map(board => (
                            <BoardTile key={board.id} board={board} handleDeleteBoard={handleDeleteBoard} />
                        ))}

                    </div>
                </SortableContext>
            </div>
        </DndContext>
    );
}

export default Main;
