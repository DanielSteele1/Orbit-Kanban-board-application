
import type { BoardType } from '../types';
import { useNavigate } from 'react-router-dom';

import BoardDropdown from "./BoardDropdown.tsx"
import { GrDrag } from 'react-icons/gr';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BoardProps {
    board: BoardType;
    handleDeleteBoard: (boardId: number) => (void);
}

function BoardTile({ board, handleDeleteBoard }: BoardProps) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: board.id });

    const style = {

        transform: CSS.Transform.toString(transform),
        transition,
        width: "inherit",
    };

    const navigate = useNavigate();

    return (
        <div className="board-tile" ref={setNodeRef} {...attributes} style={style} // this should bind each board tile to it's corrosponding board, using it's ID
            onClick={() => navigate(`/board/${board.id}`)}
        >
            <div className="board-info">
                <span className="board-name" id="gradient">
                    {board.title}
                </span>

                <span className="board-description">
                    {board.description}
                </span>

            </div>

            <div className="board-dropdown">
                <BoardDropdown

                    boardId={board.id}
                    handleDeleteBoard={handleDeleteBoard}
                />
                <span className="icon" {...listeners}>
                    <GrDrag style={{ display: 'flex', marginLeft: '10px', verticalAlign: 'middle', cursor: 'pointer' }}
                    />
                </span>
            </div>

        </div>

    );

}

export default BoardTile;
