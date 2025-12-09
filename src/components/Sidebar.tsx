import { useContext } from "react";
import { BoardContext } from "./context/BoardContext";
import type { BoardType } from "../types";
import './sidebar.css';
import { FaAngleLeft } from "react-icons/fa";


type BoardContextType = {

    boards: BoardType[];
    setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
}

function Sidebar() {
    const { boards } = useContext(BoardContext) as BoardContextType;

    return (

        <div className="sidebar">
            <div className="sidebar-controls">
                <button className="collapse-button">
                    <FaAngleLeft />
                </button>
                <span className="side"> Collapse </span>
            </div>

            <span className="sidebar-title"> Your Boards </span>
            <span className="sidebar-desc"> Quickly navigate between your existing boards. </span>

            <div className="sidebar-boards">
                {boards.map(board =>
                    <div className="sidebar-board" key={board.id}>

                        <span className="sidebar-board-title"> {board.title} </span>
                        <span className="sidebar-board-creation-date"> {board.creationDate} </span>

                    </div>
                )}
            </div>


        </div>

    );
}

export default Sidebar;