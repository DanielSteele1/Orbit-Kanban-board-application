
import { FaPlus } from "react-icons/fa";

function AddColumn() {
    return (
        <div className="column">
            <div className="add-column">
                <div className="button">
                    <button id="button-text">
                        <div className="button-icon">
                            <FaPlus style={{ margin: '10px', fontSize: '15px' }} />
                        </div>

                        <div className="column-text"> Add a new list </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddColumn;
