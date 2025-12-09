import { createContext } from 'react';
import type { BoardType } from '../../types.ts';

type BoardContextType = {
    boards: BoardType[];
    setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
}

export const BoardContext = createContext<BoardContextType>({
    boards: [],
    setBoards: () => {}
});