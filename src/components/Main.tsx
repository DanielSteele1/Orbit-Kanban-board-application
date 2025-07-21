
import Column from './Column.tsx'
import AddColumn from './AddColumn.tsx';
import { FaPlus, } from "react-icons/fa";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";

function Main() {
    return (
        <div className="main">

            <div className="controls">

                <div className="title">
                    <span className="board-title"> 
                        Board Title
                        <button id="edit"> <FiEdit3 style={{ fontSize: '20px' }} />
                        </button>
                    </span>
                    <span className="board-description"> 
                        This is a description of the board.
                        <button id="edit"> <FiEdit3 style={{ fontSize: '20px' }} />
                        </button>
                    </span>
                </div>

                <div className="taskbar">

                    <button id="button-text"> <FaPlus style={{ fontSize: '15px', marginRight: '10px' }} /> Add a new Board </button>

                    <button id="button-text"> <FiTrash style={{ fontSize: '15px', marginRight: '10px' }} /> Delete Board </button>

                    <button id="button-text">  <BsShare style={{ fontSize: '16px', marginRight: '10px' }} /> Share Board </button>

                    <button id="button-text"> <FiCopy style={{ fontSize: '15px', marginRight: '10px' }} /> Copy Board </button>
                </div>
            </div>

            <div className="column-container">

                <Column />
                <Column />
                <Column />
                <Column />
                <Column />
                <AddColumn />

            </div>

        </div>
    )
}

export default Main;
