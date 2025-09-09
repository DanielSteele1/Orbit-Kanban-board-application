
import { useState, useEffect } from 'react';
import BoardTile from "./BoardTile";

import type { BoardType } from '../types';
import { FaPlus } from 'react-icons/fa';

import { DndContext, closestCorners, type DragEndEvent, useSensor, useSensors, MouseSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";
import Masonry from 'react-masonry-css'
import { IoSearchSharp } from "react-icons/io5";
import './Masonry-grid.css';

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

function Main() {

    const sensors = useSensors(

        useSensor(MouseSensor),
        useSensor(KeyboardSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        })
    )

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
            title: 'Edit Board Title',
            description: 'Edit Description',
            creationDate: Date.now(),
            columns: []

        };
        setBoards(prev => [...prev, newBoard]);
    };

    // delete a board

    const handleDeleteBoard = (boardId: number) => {

        Toastify({
            text: `Board (with Id:${boardId}) Deleted.`,
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

    // filter boards by search term and display

    const [filteredBoard, setFilteredBoard] = useState<BoardType[]>(boards);


    useEffect(() => {
        setFilteredBoard(boards);
    }, [boards]);

    function SearchBoards(e: React.ChangeEvent<HTMLInputElement>) {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {

            setFilteredBoard(boards);


        } else {
            const filtered = boards.filter(board =>
                board.title.toLowerCase().includes(searchTerm)
            );
            setFilteredBoard(filtered);
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="main">
                <div className="taskbar">
                    <span className="intro">
                        <h1 className="App-desc-title" id="gradient"> Orbit helps you organize your projects and tasks with ease. </h1>
                    </span>

                    <span className="App-desc">
                        <ul>
                            <li className="list-item"> Create multiple boards to separate different areas of your work or life. </li>
                            <li className="list-item"> Inside each board, you can add column to categorize tasks and track progress step-by-step. </li>
                            <li className="list-item"> Re-order each column to maintain full control of your workflow. </li>
                        </ul>
                        <span className="App-desc-action" id="gradient"> Click on the 'Add a Board' button to get started. </span>
                    </span>

                </div>

                <div className="grid-board">
                    <div className="grid-controls">

                        <button
                            className="add-board"
                            onClick={handleAddBoard}>
                            <FaPlus style={{ fontSize: '18px', marginRight: '5px' }} /> Add New Board
                        </button>

                        <div className="board-search">
                            <IoSearchSharp style={{ fontSize: '20px' }} />
                            <input type="search"
                                className="board-search-input"
                                placeholder="Search for a board..."
                                onChange={SearchBoards}
                            />
                        </div>

                    </div>

                    <SortableContext
                        items={filteredBoard || []}
                        strategy={horizontalListSortingStrategy}>
                        <div className="grid">
                            {filteredBoard?.length > 0 ? (
                                <Masonry
                                    breakpointCols={1}
                                    className="masonry-grid"
                                    columnClassName="masonry-grid_column">
                                    
                                    {filteredBoard.map(board => (
                                        <BoardTile
                                            key={board.id}
                                            board={board}
                                            handleDeleteBoard={handleDeleteBoard}
                                        />
                                    ))}
                                </Masonry>
                            ) : boards.length === 0 ? (

                                <div className="no-results">
                                    No boards available. Click "Add New Board" to create one.
                                </div>
                            ) : (
                                <div className="no-results">
                                    No boards match your current search.
                                </div>

                            )}


                        </div>
                    </SortableContext>
                </div>
            </div>
        </DndContext>
    );
}

export default Main;
