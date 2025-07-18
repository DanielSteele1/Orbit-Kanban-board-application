
import Column from './Column.tsx'

function Main() {
    return (
        <div className="main">

            <div className="controls">

                <div className="title">
                    <span id="title-text"> Taskbar </span>
                </div>

                <div className="taskbar">

                    <div className="add-list">
                        <button id="button-text"> Add a new list </button>
                    </div>
                </div>
            </div>

            <div className="column-container">

                <Column />
                <Column />
                <Column />
                <Column />
                <Column />

            </div>

        </div>
    )
}

export default Main;
