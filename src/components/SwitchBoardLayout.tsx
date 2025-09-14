import { GoArrowSwitch } from "react-icons/go";

interface switchBoardProps {

    handleSwitchBoard: React.MouseEventHandler<HTMLButtonElement>;
    switchBoard?: boolean;
};

function SwitchBoards({ handleSwitchBoard }: switchBoardProps) {

    return (

        <div className="switch-boards-container">
            <div className="switch-boards">

                <div className="switch-boards-button">
                    <button onClick={handleSwitchBoard} id="button-text">
                        <div className="button-icon">
                            <GoArrowSwitch style={{ marginRight: '10px', fontSize: '15px' }} />
                        </div>
                        <div className="column-text"> Switch Board Layout </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SwitchBoards;
