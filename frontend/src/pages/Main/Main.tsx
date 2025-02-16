import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { FiSearch, FiTrash2 } from 'react-icons/fi';
import { BsSticky } from 'react-icons/bs';
import styles from './main.module.scss';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/user.store';
import { IoIosLogOut } from 'react-icons/io';
import { useAuthStore } from '../../stores/auth.store';
import { NoteState, useNoteStore } from '../../stores/note.store';
import { FaCircleUser } from 'react-icons/fa6';

export default function Main() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const createNoteRef = useRef<HTMLDivElement>(null);

    const [userState] = useAtom(userAtom);

    const { logout } = useAuthStore();
    const {
        notes,
        fetchNotes,
        addNote,
        deleteNote
    } = useNoteStore();

    useLayoutEffect(() => {
        fetchNotes();
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (createNoteRef.current && !createNoteRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
                setNewNote({ title: '', content: '' });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [newNote]);

    const handleCreateNote = async () => {
        if (newNote.title.trim() || newNote.content.trim()) {
            const note: NoteState = {
                id: Date.now().toString(),
                title: newNote.title,
                content: newNote.content,
                createdAt: new Date()
            };

            const result = await addNote(note);

            if (!result) return;

            setNewNote({ title: '', content: '' });
            setIsExpanded(false);
        }
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.mainContainer}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.leftSection}>
                        <div className={styles.logo}>
                            <img src="/logo.png" alt="NoteKeeper" width={50} />
                            <span>NoteKeeper</span>
                        </div>
                    </div>

                    <div className={styles.searchBar}>
                        <FiSearch size={20} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.userSection}>
                        <div className={styles.userButton}>
                            {userState?.avatar
                                ? <img src={userState?.avatar} />
                                : <FaCircleUser size={24} />
                            }
                        </div>

                        <div
                            className={`${styles.userButton} ${styles.logout}`}
                            onClick={logout}
                        >
                            <IoIosLogOut size={26} />
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <div
                    ref={createNoteRef}
                    className={`${styles.createNote} ${isExpanded ? styles.expanded : ''}`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                >
                    {isExpanded && (
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                        />
                    )}
                    <textarea
                        placeholder="Create note..."
                        value={newNote.content}
                        onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                        rows={isExpanded ? 3 : 1}
                    />
                    {isExpanded && (
                        <div className={styles.actions}>
                            <button onClick={handleCreateNote}>Create</button>
                        </div>
                    )}
                </div>

                {filteredNotes.length > 0 ? (
                    <div className={styles.notesGrid}>
                        {filteredNotes.map(note => (
                            <div key={note.id} className={styles.note}>
                                {note.title && <div className={styles.title}>{note.title}</div>}
                                <div className={styles.content}>{note.content}</div>
                                <div className={styles.actions}>
                                    {/* <button className={styles.actionButton}>
                                        <FiEdit2 size={16} />
                                    </button> */}
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => deleteNote(note.id)}
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.icon}>
                            <BsSticky />
                        </div>
                        <p>No notes yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
