import { atom, useAtom } from "jotai";
import { NOTE_API } from "../config/URLs";
import axiosToken from "../api/axiosToken";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface NoteState {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
}

let fetchedNotes = false;
export const notesAtom = atom<readonly NoteState[]>([]);

export function useNoteStore() {
    const [notes, setNotes] = useAtom(notesAtom);

    const fetchNotes = async () => {
        try {
            if (fetchedNotes) return;

            const response = await axiosToken.get(`${NOTE_API}/get`);

            setNotes(response.data);

            fetchedNotes = true;
        } catch (error) {
            if (!(error instanceof AxiosError)) return;

            toast.error(error.message)
        }
    };

    const addNote = async (note: Omit<NoteState, "id" | "createdAt">) => {
        try {
            await axiosToken.post(`${NOTE_API}/add`, note)

            return true;
        }
        catch (error) {
            if (!(error instanceof AxiosError)) return;

            toast.error(error.message)

            return false;
        }
    };

    const deleteNote = async (id: string) => {
        try {
            await axiosToken.delete(`${NOTE_API}/delete/${id}`);

            setNotes(prev => prev.filter(note => note.id !== id));

            return true;
        }
        catch (error) {
            if (!(error instanceof AxiosError)) return;

            toast.error(error.message)

            return false;
        }
    };

    return {
        notes,
        fetchNotes,
        addNote,
        deleteNote
    }
}