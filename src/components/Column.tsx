import Task from './Task.tsx';
import { FaPlus } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

function Column() {
    return (

        <div className="column">

            <div className="column-title">
                <span className="column-name"> Column Name </span>

                <div className="edit-button">
                    <FiEdit3 />
                </div>

            </div>

            <Task />
            <Task />
            <Task />
            <Task />
            <Task />

            <span className="add-task"> <button id="button-text"> <FaPlus style={{ margin: '10px', fontSize: '15px' }} /> Add a new task </button> </span>

        </div>
    )
}

export default Column;
