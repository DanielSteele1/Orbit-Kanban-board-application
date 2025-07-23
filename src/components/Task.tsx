
import { FiEdit3, FiTrash } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";


function Task() {
    return (
        <div className="Task-container">

            <div className="Task">

                <span className="task-text">
                    <span> Example Task </span>
                </span>

                <div className="icons">

                    <span className="icon">
                        <div id="icon" className="icon-edit"> <FiEdit3 style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} /></div>
                    </span>

                    <span className="icon">
                        <div id="icon" className="icon-copy"> <FiCopy style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} /></div>
                    </span>

                    <span className="icon">
                        <div id="icon" className="icon-delete"> <FiTrash style={{ display: 'flex', margin: '5px', verticalAlign: 'middle' }} /> </div>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Task;
