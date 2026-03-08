
import './card.css';
import { CiStickyNote } from 'react-icons/ci';
import { TbLayoutKanban } from 'react-icons/tb';
import { BiPlus } from 'react-icons/bi';


function MainCards() {

    return (

        <div className="card-container">


            <div className="card">

                <div id="card-icon">
                  <BiPlus /> <span> Create </span>
                </div>

                <div id="card-description">
                    <span> Create multiple boards to separate different areas of your work or life. </span>
                </div>

            </div>

            <div className="card">

                <div id="card-icon">
                    <CiStickyNote /> <span> Organise</span>
                </div>

                <div id="card-description">
                    <span> Inside each board, add columns to categorize tasks and track progress step-by-step. </span>
                </div>

            </div>

            <div className="card">

                <div id="card-icon">
                  <TbLayoutKanban /> <span> Reorder </span>
                </div>

                <div id="card-description">
                    <span> Re-order each column to maintain full control of your workflow. </span>
                </div>

            </div>

        </div>

    );

}

export default MainCards;