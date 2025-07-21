import Task from './Task.tsx';
import { FaPlus } from "react-icons/fa";
import { GrDrag } from "react-icons/gr";
import { TfiMore } from "react-icons/tfi";

function Column() {
    return (

        <div className="column">

            <div className="column-title">
                <span className="column-name"> Column Name </span>

                <div className="icons">
                    <span className="icon-container options">
                        <TfiMore />
                    </span>
                    <span className="icon-container Drag">
                        <GrDrag />
                    </span>
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
