
import { useState, useEffect } from 'react';
import BoardTile from "./BoardTile";

import type { BoardType } from '../types';
import { FaPlus } from 'react-icons/fa';

import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { MdOutlineSort } from "react-icons/md";
import Masonry from 'react-masonry-css'
import { IoSearchSharp } from "react-icons/io5";
import './Masonry-grid.css';

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import { TbPlanet } from 'react-icons/tb';

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

    const handleDeleteBoard = ( boardId: number) => {

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
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="main">
                <div className="taskbar">
                    <span className="intro">
                        <span className="App-title" id="gradient"> Welcome to Orbit <TbPlanet style={{ display: 'flex', justifyContent: 'center', alignContent:'center', marginLeft: '10px', color: '#ff4e50'}}/> </span>

                        <span className="App-desc">
                            Orbit helps you organize your projects and tasks with ease.
                            <br></br>
                            Create multiple boards to separate different areas of your work or life.
                            <br></br>
                            <br></br>
                            Inside each board, you can add column to categorize tasks and track progress step-by-step.
                            <br></br>
                            <br></br>
                            You can re-order each column to maintain full control of your workflow.
                            
                        </span>
                        <span id="gradient" className="App-desc"> Click on the 'Add a Board' button to get started. </span>

                    </span>

                </div>

                <div className="grid-board">
                    <div className="grid-controls">

                        <button
                            className="add-board"
                            onClick={handleAddBoard}>
                            <FaPlus style={{ fontSize: '18px', marginRight: '5px' }} /> Add a New Board
                        </button>

                        <div className="board-search">
                            <IoSearchSharp style={{ fontSize: '20px' }} />
                            <input type="search"
                                className="board-search-input"
                                placeholder="Search for a board..."
                                onChange={SearchBoards}
                            />
                        </div>

                        <button className="board-filter">
                            <MdOutlineSort style={{ fontSize: '20px', marginRight: '5px' }} /> Filter Boards
                        </button>
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
                                    No boards available. Click "Add a New Board" to create one.
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
