import React from 'react';
import { FiCopy, FiTrash } from 'react-icons/fi';
import { TfiMore } from "react-icons/tfi";;

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FaFileExport } from 'react-icons/fa';

interface BoardDropdownProps {
    
}

const BoardDropdown: React.FC<BoardDropdownProps> = ({  }) => {

    const dropdownContent = (
        <div className="tooltip" style={{ display: 'flex',  width: 'fit-content', flexDirection: 'column', justifyContent: 'center' }}>
            <button
                className="tooltip-icons"
                onClick={() => alert('Copy clicked')}
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
                <TfiMore style={{ display: 'flex', verticalAlign: 'middle' }} />
            </span>
        </Tippy>
    );
};

export default BoardDropdown;