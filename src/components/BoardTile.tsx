
import type { BoardType } from '../types';
import { useNavigate } from 'react-router-dom';

import BoardDropdown from "./BoardDropdown.tsx"
import { AiOutlineDrag } from "react-icons/ai";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface BoardProps {
    board: BoardType;
    handleDeleteBoard: (boardId: number) => (void);
}

function BoardTile({ board, handleDeleteBoard }: BoardProps) {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: board.id });

    const style = {

        transform: CSS.Transform.toString(transform),
        transition,
        willChange: "transform",
        opacity: isDragging ? 0.5 : undefined,
        cursor: isDragging ? 'grabbing' : undefined

    };

    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        // Only navigate if we're not clicking the drag handle or dropdown
        if (!(e.target as HTMLElement).closest('.board-dropdown')) {
            navigate(`/board/${board.id}`);
        }
    };

    return (
        <div className="board-tile" ref={setNodeRef} {...attributes} style={style} onClick={handleClick}// this should bind each board tile to it's corrosponding board, using it's ID
        >

            <div className="board-info">
                <div className="board-top">

                    <span className="board-name">
                        {board.title}
                    </span>

                    <div className="board-dropdown">
                        <BoardDropdown

                            boardId={board.id}
                            handleDeleteBoard={handleDeleteBoard}
                        />
                        <span className="icon" {...listeners}>
                            <AiOutlineDrag id="drag-icon" style={{ display: 'flex', marginLeft: '10px', verticalAlign: 'middle', fontSize: '23px' }}
                            />
                        </span>
                    </div>

                </div>

                <div className="board-bottom">

                    <span className="board-description">
                        {board.description}
                    </span>

                </div>

            </div>
        </div>
    );

}

export default BoardTile;
