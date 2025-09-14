
import React, { useEffect, useRef } from "react";
import 'react-dropdown/style.css';

import type { NoteType } from "../types";

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FiCopy, FiTrash } from "react-icons/fi";
import { GrDrag } from "react-icons/gr";

interface NoteProps extends NoteType {

    id: number;
    title: string;
    text: string;
    handleDeleteNote: (id: any) => void;
    handleNoteTextEdit: (id: any, title: string, text: string) => void;
}

const Note: React.FC<NoteProps> = ({ text, title, id, handleDeleteNote, handleNoteTextEdit }) => {

    // resizes textarea so that it automatically grows and shrinks with content.
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {

        transform: CSS.Transform.toString(transform),
        transition,
        width: "inherit",
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'; // Reset height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to scroll height
        }
    }, [text]);

    const handleCopy = (text: string) => {

        Toastify({
            text: "Text copied to clipboard.",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: '#292929',
                color: '#ff4e50',
                boxShadow: 'none',
                display: 'flex',
                width: 'fit-content',
                padding: '10px'


            },
            onClick: function () { }
        }).showToast();

        navigator.clipboard.writeText(text);
    }

    return (
        <div className="Note-container" ref={setNodeRef} {...attributes} style={style} >
            <div className="Note">

                <div className="note-title">
                    <input
                        onChange={(e) => handleNoteTextEdit(id, title, e.target.value)}
                        value={title}
                        className="note-name"
                        maxLength={50}
                        placeholder={"Edit Title"}

                    />

                    <div className="icons">
                        <span className="icon"
                        id="delete-icon"
                            onClick={handleDeleteNote}
                        >
                            <FiTrash
                                style={{ display: 'flex', marginRight: '10px', verticalAlign: 'middle', cursor: 'pointer' }}
                            />

                        </span>

                        <span className="icon" {...listeners} id="drag-icon">
                            <GrDrag id="drag-icon" style={{ display: 'flex', marginRight: '10px', verticalAlign: 'middle' }}
                            />
                        </span>
                    </div>
                </div>

                <div className="note-content">
                    <textarea
                        className="note-content-input"
                        onChange={(e) => handleNoteTextEdit(id, e.target.value, text)}
                        value={text}
                        maxLength={500}
                        placeholder={"Enter Note"}
                    />

                    <div className="icons">
                        <div className="icon"
                        onClick={() => handleCopy(text)}>
                            <FiCopy style={{ display: 'flex', marginRight: '10px', verticalAlign: 'middle' }}/>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Note;
