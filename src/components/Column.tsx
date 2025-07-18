
import Task from './Task.tsx';
import { FaPlus, FaStickyNote } from "react-icons/fa";


function Column() {
    return (

        <div className="column">

            <span className="column-name"> <FaStickyNote /> Column Name </span>

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
