import { useState, useEffect } from 'react';

import Column from './Column.tsx';
import AddColumn from './AddColumn.tsx';

import Note from './Note.tsx'
import AddNote from './AddNote.tsx'
import SearchBoard from './SearchBoard.tsx'
//import Sidebar from './Sidebar.tsx'

import { useParams } from 'react-router-dom';

import type { BoardType } from '../types.ts';
import type { BoardItem } from '../types.ts';

import { DndContext, closestCorners, type DragEndEvent, useSensor, useSensors, KeyboardSensor, PointerSensor } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import SwitchBoardLayout from './SwitchBoardLayout.tsx';

import Masonry from 'react-masonry-css';
import './Board-Masonry-grid.css';

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from 'react-icons/fa';

function BoardView() {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
            activationConstraint: {
                delay: 0,
                tolerance: 1,
            },
        })
    );

    const { boardId } = useParams<{ boardId: string }>();
    
    const [board, setBoard] = useState<BoardType | null>(null);

    useEffect(() => {
        const savedBoards = localStorage.getItem('boards');
        if (savedBoards && boardId) {
            const boards: BoardType[] = JSON.parse(savedBoards);
            const found = boards.find(b => b.id.toString() === boardId);

            if (found) {
                setBoard({
                    ...found,
                    items: found.items ?? []
                });
            } else {
                setBoard(found ?? null);
            }
        }
    }, [boardId]);

    // Helper function to update localStorage
    const updateBoardInStorage = (updatedBoard: BoardType) => {
        const savedBoards = localStorage.getItem('boards');
        if (savedBoards) {
            const boards: BoardType[] = JSON.parse(savedBoards);
            const updatedBoards = boards.map(b =>
                b.id === updatedBoard.id ? updatedBoard : b
            );
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
        }
    };

    const handleAddColumn = () => {
        if (!board) return;

        const newColumn: BoardItem = {

            type: "column",
            data: {
                id: Date.now(),
                title: '',
                tasks: [],
                text: ''
            }
        };

        const updatedBoard = {
            ...board,
            items: [...board.items, newColumn]
        };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    const handleDeleteColumn = (columnId: number) => {
        if (!board) return;
        Toastify({
            text: "Column Deleted.",
            duration: 4000,
            gravity: "bottom",
            position: "right",

            style: {
                background: '#292929',
                color: '#ff4e50',
                boxShadow: 'none',
                padding: '10px'
            }
        }).showToast();

        const updatedBoard = {
            ...board,
            items: board.items.filter(item => !(item.type === 'column' && item.data.id === columnId))
        };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };


    const handleAddNote = () => {
        if (!board) return;
        const newNote: BoardItem = {

            type: "note",
            data: {
                id: Date.now(),
                title: '',
                text: '',
                creationDate: Date.now()
            }

        };

        const updatedBoard = {
            ...board,
            items: [...board.items, newNote]
        };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    const handleDeleteNote = (id: number) => {

        if (!board) return;
        Toastify({
            text: "Note Deleted.",
            duration: 4000,
            gravity: "bottom",
            position: "right",

            style: {
                background: '#292929',
                color: '#ff4e50',
                boxShadow: 'none',
                padding: '10px'
            }
        }).showToast();

        const updatedBoard = {
            ...board,
            items: board.items.filter(item => !(item.type === 'note' && item.data.id === id))
        };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };


    const handleDeleteTask = (columnId: number, taskId: number) => {
        if (!board) return;
        Toastify({
            text: "Task Deleted.",
            duration: 4000,
            gravity: "bottom",
            position: "right",
            style: {
                background: '#292929',
                color: '#ff4e50',
                boxShadow: 'none',
                padding: '10px'
            }
        }).showToast();

        const updatedItems = board.items.map(item => {
            if (item.type === 'column' && item.data.id === columnId) {
                return { ...item, data: { ...item.data, tasks: item.data.tasks.filter(t => t.id !== taskId) } };
            }
            return item;
        });
        setBoard({ ...board, items: updatedItems });
        updateBoardInStorage({ ...board, items: updatedItems });
    };


    const handleAddTask = (columnId: number) => {
        if (!board) return;
        const updatedItems = board.items.map(item => {
            if (item.type === 'column' && item.data.id === columnId) {
                return { ...item, data: { ...item.data, tasks: [...item.data.tasks, { id: Date.now(), text: '' }] } };
            }
            return item;
        });
        setBoard({ ...board, items: updatedItems });
        updateBoardInStorage({ ...board, items: updatedItems });
    };

    const handleToggleIsCompleted = (columnId: number, taskId: number) => {
        if (!board) return;
        const updatedItems = board.items.map(item => {
            if (item.type === 'column' && item.data.id === columnId) {
                return {
                    ...item,
                    data: {
                        ...item.data,
                        tasks: item.data.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t)
                    }
                };
            }
            return item;
        });
        setBoard({ ...board, items: updatedItems });
        updateBoardInStorage({ ...board, items: updatedItems });
    };

    const handleTaskTextChange = (columnId: number, taskId: number, newText: string) => {
        if (!board) return;
        const updatedItems = board.items.map(item => {
            if (item.type === 'column' && item.data.id === columnId) {
                return {
                    ...item,
                    data: {
                        ...item.data,
                        tasks: item.data.tasks.map(t => t.id === taskId ? { ...t, text: newText } : t)
                    }
                };
            }
            return item;
        });
        setBoard({ ...board, items: updatedItems });
        updateBoardInStorage({ ...board, items: updatedItems });
    };

    const handleNoteTextEdit = (id: number, newNoteText: string,) => {

        if (!board) return;
        const updatedItems = board.items.map(item => {

            if (item.type === 'note' && item.data.id === id) {

                return {
                    ...item,
                    data: {
                        ...item.data,
                        text: newNoteText,
                    }
                };
            }
            return item;
        });

        setBoard({ ...board, items: updatedItems });
        updateBoardInStorage({ ...board, items: updatedItems });

    };

    const handleTitleChange = (id: number, newTitle: string) => {
        if (!board) return;

        const updatedItems = board.items.map(item => {

            if (item.type === 'column' && item.data.id === id) {

                return {
                    ...item,
                    data: {
                        ...item.data,
                        title: newTitle
                    }
                };
            }
            if (item.type === 'note' && item.data.id === id) {
                return {
                    ...item,
                    data: {
                        ...item.data,
                        title: newTitle
                    }
                };
            }
            return item;
        });


        setBoard({ ...board, items: updatedItems });
        updateBoardInStorage({ ...board, items: updatedItems });

    };

    const handleBoardText = (field: 'title' | 'description', value: string) => {
        if (!board) return;
        const updatedBoard = { ...board, [field]: value };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    const [switchBoard, setswitchBoard] = useState(false);

    const handleSwitchBoard: React.MouseEventHandler<HTMLButtonElement> = () => {

        setswitchBoard(prev => !prev);

        Toastify({
            text: "Switched Board layout.",
            duration: 4000,
            gravity: "bottom",
            position: "right",
            style: {
                background: '#292929',
                color: '#ff4e50',
                boxShadow: 'none',
                padding: '10px'
            }
        }).showToast();
    };

    const handleDragEnd = (event: DragEndEvent) => {

        if (!board) return;
        const { active, over } = event;

        if (active.id !== over?.id && over) {

            const oldIndex = board.items.findIndex(item => item.data.id === active.id);
            const newIndex = board.items.findIndex(item => item.data.id === over.id);

            const updatedItems = arrayMove(board.items, oldIndex, newIndex);

            setBoard({ ...board, items: updatedItems });
            updateBoardInStorage({ ...board, items: updatedItems });
        }
    };

    const [filteredItems, setFilteredItems] = useState<BoardItem[]>([]);

    useEffect(() => {
        if (board) {
            setFilteredItems(board.items);
        }
    }, [board]);

    const handleSearchItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();

        if (!board) return;

        if (searchTerm === '') {

            setFilteredItems(board.items);

        } else {
            const filteredItems = board.items.filter(item => {

                if (item.type === 'note' || item.type === 'column') {
                    return item.data.title.toLowerCase().includes(searchTerm);
                }
                return false;

            });

            setFilteredItems(filteredItems);
        }

    };

    if (!board) return <div>Loading or Board not found...</div>;

    return (
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="Board-view">
                    {/* <div className="sidebar-container">
                        <Sidebar />
                    </div> */}

                    <div className="kanban-board">
                        <div className={switchBoard ? "board-container-kanban-mode" : "board-container-masonry-mode"}>
                            <div className="controls-container">
                                <div className="controls">
                                    <div className="board-text">

                                        <input
                                            className="board-title-input"
                                            placeholder="Untitled Board"
                                            maxLength={35} value={board.title}
                                            onChange={(e) => handleBoardText('title', e.target.value)}
                                        />

                                        <div className="board-id">Board ID:{board.id}</div>

                                        <textarea
                                            className="board-description-input"
                                            placeholder="Type to add a description"
                                            maxLength={500} value={board.description}
                                            onChange={(e) => handleBoardText('description', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="board-buttons">

                                    <AddColumn handleAddColumn={handleAddColumn} />
                                    <AddNote handleAddNote={handleAddNote} />
                                    <SearchBoard handleSearchItems={handleSearchItems} />
                                    <SwitchBoardLayout handleSwitchBoard={handleSwitchBoard} switchBoard={switchBoard} />

                                    {switchBoard ? (

                                        <div className="switchBoard-icon" style={{ padding: '10px' }}> <FaAngleRight style={{ display: 'flex', margin: '10px', fontSize: '20px' }} /> Kanban Layout </div>

                                    ) : (

                                        <div className="switchBoard-icon" style={{ padding: '10px' }}> <FaAngleDown style={{ display: 'flex', margin: '10px', fontSize: '20px' }} /> Masonry Layout </div>

                                    )}
                                </div>

                            </div>

                            {switchBoard ? (
                                <div className="column-scroll-container">
                                    <div className="column-container">

                                        <SortableContext items={filteredItems.map(i => i.data.id)} strategy={horizontalListSortingStrategy}>

                                            {filteredItems.map(item => item.type === 'column' ? (
                                                <Column
                                                    key={item.data.id}
                                                    columnId={item.data.id}
                                                    title={item.data.title}
                                                    tasks={item.data.tasks}
                                                    handleDeleteColumn={() => handleDeleteColumn(item.data.id)}
                                                    handleAddTasks={() => handleAddTask(item.data.id)}
                                                    handleDeleteTasks={(taskId) => handleDeleteTask(item.data.id, taskId)}
                                                    handleToggleIsCompleted={(taskId) => handleToggleIsCompleted(item.data.id, taskId)}
                                                    handleTaskTextChange={(taskId, newText) => handleTaskTextChange(item.data.id, taskId, newText)}
                                                    handleTitleChange={(newTitle) => handleTitleChange(item.data.id, newTitle)}
                                                />
                                            ) : (
                                                <Note
                                                    key={item.data.id}
                                                    id={item.data.id}
                                                    title={item.data.title}
                                                    text={item.data.text}
                                                    creationDate={item.data.creationDate}
                                                    handleDeleteNote={() => handleDeleteNote(item.data.id)}
                                                    handleNoteTextEdit={(newNoteText) => handleNoteTextEdit(item.data.id, newNoteText)}
                                                    handleTitleChange={(newTitle) => handleTitleChange(item.data.id, newTitle)}
                                                />
                                            ))}
                                        </SortableContext>

                                    </div>
                                </div>
                            ) : (

                                <div className="board-masonry-container">
                                    <SortableContext items={filteredItems.map(i => i.data.id)} strategy={horizontalListSortingStrategy}>
                                        <Masonry
                                            breakpointCols={{ default: 6, 1700: 4, 1200: 2, 750: 1 }}
                                            className="board-masonry-grid"
                                            columnClassName="board-masonry-grid_column">
                                            {filteredItems.map(item => item.type === 'column' ? (

                                                <Column
                                                    key={item.data.id}
                                                    columnId={item.data.id}
                                                    title={item.data.title}
                                                    tasks={item.data.tasks}
                                                    handleDeleteColumn={() => handleDeleteColumn(item.data.id)}
                                                    handleAddTasks={() => handleAddTask(item.data.id)}
                                                    handleDeleteTasks={(taskId) => handleDeleteTask(item.data.id, taskId)}
                                                    handleToggleIsCompleted={(taskId) => handleToggleIsCompleted(item.data.id, taskId)}
                                                    handleTaskTextChange={(taskId, newText) => handleTaskTextChange(item.data.id, taskId, newText)}
                                                    handleTitleChange={(newTitle) => handleTitleChange(item.data.id, newTitle)}
                                                />
                                            ) : (

                                                <Note

                                                    key={item.data.id}
                                                    id={item.data.id}
                                                    title={item.data.title}
                                                    text={item.data.text}
                                                    creationDate={item.data.creationDate}
                                                    handleDeleteNote={() => handleDeleteNote(item.data.id)}
                                                    handleNoteTextEdit={(newNoteText) => handleNoteTextEdit(item.data.id, newNoteText)}
                                                    handleTitleChange={(newTitle) => handleTitleChange(item.data.id, newTitle)}

                                                />
                                            ))}


                                        </Masonry>
                                    </SortableContext>
                                </div>
                            )}
                        </div>
                    </div >
                </div>
            </DndContext >

    );
}

export default BoardView;