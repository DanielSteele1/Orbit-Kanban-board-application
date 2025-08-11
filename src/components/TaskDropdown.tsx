import React from 'react';
import { FiCopy, FiTrash } from 'react-icons/fi';
import { TfiMore } from "react-icons/tfi";;

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface DropdownProps {
    handleDeleteTasks: (taskId: any) => void;
}

const TaskDropdown: React.FC<DropdownProps> = ({ handleDeleteTasks }) => {

    const dropdownContent = (
        <div className="tooltip" style={{ display: 'flex',  width: 'fit-content', flexDirection: 'column', justifyContent: 'center' }}>
            <button
                className="tooltip-icons"
                onClick={() => alert('Copy clicked')}
                style={{ display: 'flex', margin: '10px' }}
            >
                <FiCopy />

                <span className="tooltip-text">
                    Copy
                </span>

            </button>

            <button
                className="tooltip-icons"
                onClick={() => handleDeleteTasks(null)}
                style={{ display: 'flex', margin: '10px', marginLeft: '20px' }}
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
            <span className="icon-trigger">
                <TfiMore style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} />
            </span>
        </Tippy>
    );
};

export default TaskDropdown;