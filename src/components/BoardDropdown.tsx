import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { TfiMore } from "react-icons/tfi";;

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FaFileExport } from 'react-icons/fa';

interface BoardDropdownProps {
    boardId: number;
    handleDeleteBoard: (boardId: number) => void;
}

const BoardDropdown: React.FC<BoardDropdownProps> = ({ handleDeleteBoard, boardId }) => {

    const dropdownContent = (
        <div className="tooltip" style={{ display: 'flex', width: 'fit-content', flexDirection: 'column', justifyContent: 'center' }}>
            <button
                className="tooltip-icons"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBoard(boardId);
                }}
                style={{ display: 'flex', margin: '10px' }}
            >
                <FiTrash />

                <span className="tooltip-text">
                    Delete
                </span>

            </button>

            <button
                className="tooltip-icons"
                style={{ display: 'flex', margin: '10px' }}
            >
                <FaFileExport />

                <span className="tooltip-text">
                    Export Board
                </span>

            </button>
        </div>
    );

    return (
        <Tippy
            className="tooltip"
            content={dropdownContent}
            interactive={true}
            placement="bottom"
            trigger="mouseenter focus"
            arrow={true}
            hideOnClick={false}
        >
            <span className="icon-trigger">
                <TfiMore style={{ display: 'flex', marginLeft: '10px', verticalAlign: 'middle', fontSize: '23px' }} />
            </span>
        </Tippy>
    );
};

export default BoardDropdown;