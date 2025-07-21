
import Column from './Column.tsx'
import AddColumn from './AddColumn.tsx';
import { FaPlus, } from "react-icons/fa";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";

function Main() {
    return (
        <div className="main">

            <div className="controls">

                <div className="title">
                    <span className="board-title"> Board Title </span>

                </div>

                <div className="taskbar">

                    <button id="button-text"> <FaPlus style={{ fontSize: '15px' }} /> </button>

                    <button id="button-text"> <FiEdit3 style={{ fontSize: '15px' }} /> </button>

                    <button id="button-text"> <FiTrash style={{ fontSize: '15px' }} /> </button>

                    <button id="button-text">  <BsShare style={{ fontSize: '16px', marginRight: '10px' }} /> Share Board </button>

                    <button id="button-text"> <MdContentCopy style={{ fontSize: '15px', marginRight: '10px' }} /> Copy Board </button>
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
