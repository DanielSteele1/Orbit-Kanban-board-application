
import { useState, useEffect } from 'react';
import BoardView from "./BoardView";
import BoardTile from "./BoardTile";

import type { BoardType } from '../types';
import { FaPlus } from 'react-icons/fa';
import { FiCopy, FiTrash } from 'react-icons/fi';
import { BsFiletypeJson } from 'react-icons/bs';


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

    return (
        <div className="main">

            <div className="taskbar">

                <span className="intro">

                    <span className="App-title"> Welcome to App Name! </span>

                    <span className="App-desc">                    
                         This app helps you organize your projects and tasks with ease.
                        Create multiple boards to separate different areas of your work or life.
                        Inside each board, you can add columns to categorize tasks and track progress step-by-step.
                    </span>

                </span>

                <button id="button-text"
                    onClick={handleAddBoard}>
                    <FaPlus style={{ fontSize: '20px', margin: '5px' }} /> Add a New Board </button>
                <button id="button-text">
                    <FiTrash style={{ fontSize: '20px' }} />  </button>
                <button id="button-text">
                    <BsFiletypeJson style={{ fontSize: '25px' }} />  </button>
                <button id="button-text">
                    <FiCopy style={{ fontSize: '20px' }} />  </button>
            </div>

            <div className="board-grid">

                {boards.map(board => (
                    <BoardTile key={board.id} board={board} />
                ))}

            </div>

        </div>
    );
}

export default Main;
