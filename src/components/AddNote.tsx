
import { RiStickyNoteLine } from "react-icons/ri";

type AddNoteProps = {
    handleAddNote: () => void;
}

function AddNote({ handleAddNote }: AddNoteProps) {

    return (

        <div className="add-column-container">
            <div className="add-column">

                <div className="add-column-button">
                    <button onClick={handleAddNote} id="button-text">
                        <div className="button-icon">
                            <RiStickyNoteLine style={{ marginRight: '10px', fontSize: '20px' }} />
                        </div>
                        <div className="column-text"> Add a Note </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddNote;