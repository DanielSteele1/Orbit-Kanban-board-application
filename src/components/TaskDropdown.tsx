import React from 'react';
import { FiCopy, FiTrash } from 'react-icons/fi';
import { TfiMore } from "react-icons/tfi";;

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface DropdownProps {
    handleCopy: (text: string) => void;
    handleDeleteTasks: (taskId: any) => void;
    text: string;
}

const TaskDropdown: React.FC<DropdownProps> = ({ handleDeleteTasks, handleCopy, text }) => {

    const dropdownContent = (
        <div className="tooltip" style={{ display: 'flex',  width: 'fit-content', flexDirection: 'column'}}>
            <button
                className="tooltip-icons"
                onClick={() => handleCopy(text)}
                style={{ display: 'flex' }}
            >
                <FiCopy />

                <span className="tooltip-text">
                    Copy
                </span>

            </button>

            <button
                className="tooltip-icons"
                onClick={() => handleDeleteTasks(null)}
                style={{ display: 'flex' }}
            >
                <FiTrash />

                <span className="tooltip-text">
                    Delete
                </span>

            </button>
        </div>
    );

    return (
        <Tippy
            content={dropdownContent}
            interactive={true}
            placement="bottom"
            trigger="mouseenter focus"
            arrow={true}
            hideOnClick={false}
        >
            <span className="icon-trigger" id="icon-more">
                <TfiMore style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} />
            </span>
        </Tippy>
    );
};

export default TaskDropdown;