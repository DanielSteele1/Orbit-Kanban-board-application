import { IoSearchSharp } from "react-icons/io5";

type SearchBoardProps = {
    handleSearchItems:(e: any) => void;
}

function SearchBoard({ handleSearchItems }: SearchBoardProps) {

    return (

        <div className="add-column-container">
            <div className="add-column">

                <button
                    onChange={handleSearchItems}
                    id="button-text"
                >

                    <div className="button-icon">
                        <IoSearchSharp style={{ fontSize: '20px' }} />
                    </div>

                    <input
                        type="search"
                        className="board-search-input"
                        placeholder="Search Column/Note title..."

                    />
                </button>
            </div>
        </div>
    )
}

export default SearchBoard;
