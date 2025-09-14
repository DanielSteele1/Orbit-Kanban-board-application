
import { FaPlus } from "react-icons/fa";

type AddColumnProps = {
    handleAddColumn: () => void;
}

function AddColumn({ handleAddColumn }: AddColumnProps) {

    return (

        <div className="add-column-container">
            <div className="add-column">

                <div className="add-column-button">
                    <button onClick={handleAddColumn} id="button-text">
                        <div className="button-icon">
                            <FaPlus style={{ marginRight: '10px', fontSize: '15px' }} />
                        </div>
                        <div className="column-text"> Add a new list </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddColumn;
