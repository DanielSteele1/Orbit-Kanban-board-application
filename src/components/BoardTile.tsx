
import type { BoardType } from '../types';
import { useNavigate } from 'react-router-dom';


function BoardTile({ board }: { board: BoardType }) {

    const navigate = useNavigate();

    return (
        <div className="board-tile" // this should bind each board tile to it's corrosponding board, using it's ID
            onClick={() => navigate(`/board/${board.id}`)}
        >

            <span className="Board-name">
                {board.title || 'No Board Title Yet'}
            </span>

            <span className="Board-description">
                {board.description || 'No Description yet'}
            </span>

        </div>

    );

}

export default BoardTile;
